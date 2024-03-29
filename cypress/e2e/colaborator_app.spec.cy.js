describe("Colaborator App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.request("POST", "http://localhost:5005/colaborator-API/testing/reset")

    const user = {
      email: "test@test.com",
      name: "Test User",
      role: "Tester",
      password: "Test123!" 
    }
    cy.request("POST", "http://localhost:5005/colaborator-API/auth/signup", user)
  });

  it("frontpage can be opened", () => {
    cy.contains("work together");
  });

  it("loginpage can be opened", () => {
    cy.contains("Open main menu").click();
    cy.get('[data-test-id="login-button"]').click();
    cy.contains("Log in to your account");
  });

  it("user cannot log in. Invalid user", () => {
    cy.contains("Open main menu").click();
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="login-form"] input[name="email"]').type(
      "wrong@test.com"
    );
    cy.get('[data-test-id="login-form"] input[name="password"]')
      .last()
      .type("Test123!");
    cy.contains("Log In").click();
    cy.get('[data-test-id="login-error"]').should("contain", "User not found.");
  });

  it("user cannot log in. Invalid password", () => {
    cy.contains("Open main menu").click();
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="login-form"] input[name="email"]').type(
      "test@test.com"
    );
    cy.get('[data-test-id="login-form"] input[name="password"]')
      .last()
      .type("Wrong123!!");
    cy.contains("Log In").click();
    cy.get('[data-test-id="login-error"]').should(
      "contain",
      'Unable to authenticate the user'
    );
  });

  it("user can log in", () => {
    cy.contains("Open main menu").click();
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="login-form"] input[name="email"]').type(
      "test@test.com"
    );
    cy.get('[data-test-id="login-form"] input[name="password"]')
      .last()
      .type("Test123!");
    cy.contains("Log In").click();
    cy.contains("New Project");
    cy.saveLocalStorage();

  });

  // it("user can log out", () => {
  //   cy.contains("Open main menu").click();
  //   cy.get('[data-test-id="logout-button"]').click();
  //   cy.contains("Log in to your account");
  // });
});

describe("When logged in", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("create a project can be cancelled", () => {
    // cy.contains("Open main menu").click();
    // cy.get('[data-test-id="login-button"]').click();
    // cy.get('[data-test-id="login-form"] input[name="email"]').type(
    //   "test@test.com"
    // );
    // cy.get('[data-test-id="login-form"] input[name="password"]')
    //   .last()
    //   .type("Test123!");
    // cy.contains("Log In").click();
    cy.contains("New Project");
    cy.contains("New Project").click();
    cy.get('[type="button"]').contains("Cancel").click();
    cy.contains("Cancel").should("not.exist");
    cy.saveLocalStorage();
  });

  it("new project cannot be created. title not provided", () => {
    cy.contains("New Project").click();
    cy.get('[type="submit"]').contains("Create").click();

    cy.contains("Enter a title");
  });

  it("new project cannot be created. team not selected", () => {
    cy.get('[data-test-id="create-project-form"] input[name="title"]').type(
      "test-project"
    );
    cy.get('[type="submit"]').contains("Create").click();
    cy.get('[data-test-id="create-project-team-error"]').should(
      "contain",
      "Select a team"
    );
  });

  it("a new project can be created", () => {
    cy.get('[data-test-id="team-listbox"]').click();
    cy.get('[data-test-id="team-listbox-options"]').contains("Test User").click();
    cy.get('[data-test-id="create-project-form"]').click();
    cy.get(
      '[data-test-id="create-project-form"] textarea[name="description"]'
    ).type("test-project-description");
    cy.get('[type="submit"]').contains("Create").click();
    cy.contains("Cancel").should("not.exist");
    cy.contains("test-project");
  });

  it("new project cannot be created. duplicated title", () => {
    cy.contains("New Project").click();
    cy.get('[data-test-id="create-project-form"] input[name="title"]').type(
      "test-project"
    );
    cy.get('[data-test-id="team-listbox"]').click();
    cy.get('[data-test-id="team-listbox-options"]').contains("Test User").click();
    cy.get('[data-test-id="create-project-form"]').click();
    cy.get('[type="submit"]').contains("Create").click();
    cy.get('[data-test-id="create-project-error"]').should(
      "contain",
      "Duplicated project name"
    );
    cy.get('[type="button"]').contains("Cancel").click();

    cy.contains("Cancel").should("not.exist");
  });

  it("update a project can be cancelled", () => {
    cy.get('[data-test-id="project-update-button"]').last().click();
    cy.contains("Update project: test-project");
    cy.get('[type="button"]').contains("Cancel").click();
    cy.contains("Cancel").should("not.exist");
  });

  it("new project cannot be updated. title not provided", () => {
    cy.get('[data-test-id="project-update-button"]').last().click();
    cy.contains("Update project: test-project");
    cy.get('[data-test-id="update-project-form"] input[name="title"]').clear();
    cy.get('[type="submit"]').contains("Save").click();
    cy.contains("Enter a title");
  });

  it("new project cannot be updated. team not selected", () => {
    cy.get('[data-test-id="update-project-form"] input[name="title"]').type(
      "test-project"
    );

    cy.get('[data-test-id="team-listbox"]').click();
    cy.get('[data-test-id="team-listbox-options"]').contains("Test").click();
    cy.get('[data-test-id="update-project-form"]').click();
    cy.get('[type="submit"]').contains("Save").click();
    cy.contains("Select a team");
  });

  it("a project can be updated", () => {
    cy.contains("Update project: test-project");
    cy.get('[data-test-id="update-project-form"] input[name="title"]').clear();
    cy.get('[data-test-id="update-project-form"] input[name="title"]').type(
      "test-project-updated"
    );
    cy.get('[data-test-id="team-listbox"]').click();
    cy.get('[data-test-id="team-listbox-options"]').contains("Test").click();
    cy.get('[data-test-id="update-project-form"]').click();
    cy.get('[type="submit"]').contains("Save").click();
    cy.contains("Cancel").should("not.exist");
    cy.contains("test-project-updated");
  });

  it("delete a project can be cancelled", () => {
    cy.get('[data-test-id="project-delete-button"]').last().click();
    cy.contains("Delete project: test-project-updated");
    cy.get('[type="button"]').contains("Cancel").click();
    cy.contains("Cancel").should("not.exist");
    cy.contains("test-project");
  });

  it("a new project can be deleted", () => {
    cy.get('[data-test-id="project-delete-button"]').last().click();
    cy.contains("Delete project: test-project-updated");
    cy.get('[type="button"]').contains("Delete Project").click();
    cy.get("test-project").should("not.exist");
  });
});
