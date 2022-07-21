import NavBar from "../components/navbar/NavBar";

import DeletProjectModal from "../components/modals/DeleteProjectModal";
import Footer from "../components/footer/Footer";
import { AuthContext } from "../context/auth.context";
import ProjectManagementSection from "../components/sections/ProjectManagementSection";
import ProjectsListSection from "../components/sections/ProjectsListSection";
import CompletedProjectsSection from "../components/sections/CompletedProjectsSection";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const completedProjects = [
  {
    name: "First Completed Project",
    href: "#",
    siteHref: "#",
    repoHref: "#",
    repo: "aleixmarsa/first-completed-project",
    tech: "React",
    lastDeploy: "12h ago",
    location: "Catalunya",
    starred: true,
    active: true,
  },
  {
    name: "Second Completed Project",
    href: "#",
    siteHref: "#",
    repoHref: "#",
    repo: "aleixmarsa/second-completed-project",
    tech: "React",
    lastDeploy: "20h ago",
    location: "Catalunya",
    starred: true,
    active: true,
  },
  // More projects...
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const ProjectsPage = () => {
  const [editProject, setEditProject] = useState(false);
  const [filteredCurrentProjects, setFilteredCurrentProjects] = useState([]);
  const [filteredCompletedProjects, setFilteredCompletedProjects] = useState([]);

  const [currentProjects, setCurrentProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  const [newProject, setNewProject] = useState(false);

  const [id, setId] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [modalHasRender, setModalHasRender] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(true);
  const { user } = useContext(AuthContext);

  const filterProjects = (searchText) => {
    let projectsCopy = [...currentProjects];
    searchText !== ""
      ? setFilteredCurrentProjects(
          projectsCopy.filter((project) =>
            project.title.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : setFilteredCurrentProjects(currentProjects);
     projectsCopy = [...completedProjects];

      searchText !== ""
      ? setFilteredCompletedProjects(
          projectsCopy.filter((project) =>
            project.title.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : setFilteredCompletedProjects(completedProjects);
  };

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/colaborator-API/projects/current`)
      .then((response) => {
        setCurrentProjects(response.data);
        setFilteredCurrentProjects(response.data);
      })
      .catch((error) => console.log(error));

      axios
      .get(`${API_URL}/colaborator-API/projects/completed`)
      .then((response) => {
        setCompletedProjects(response.data);
        setFilteredCompletedProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  const refresAllProjects = (response, action, id) => {
    let projectsCopy = [...currentProjects];
    if (action === "post") {
      projectsCopy = [...currentProjects, response.data];
    } else if (action === "delete") {
      const index = projectsCopy.findIndex((object) => {
        return object._id === id;
      });
      projectsCopy.splice(index, 1);
    }
    setCurrentProjects(projectsCopy);
    setFilteredCurrentProjects(projectsCopy);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar filterProjects={filterProjects} />
      {modalHasRender && (
        <DeletProjectModal
          refresAllProjects={refresAllProjects}
          title={projectTitle}
          id={id}
          setOpenDeleteModal={setOpenDeleteModal}
          openDeleteModal={openDeleteModal}
        />
      )}
      {/* 3 column wrapper */}
      <div className="flex-grow w-full max-w-9xl mx-auto xl:px-8 lg:flex">
        <div className="flex-2 bg-white xl:flex ">
          {/* Project Managment*/}
          <ProjectManagementSection
            newProject={newProject}
            setNewProject={setNewProject}
            id={id}
            user={user}
            projectsInProgress={currentProjects}
            editProject={editProject}
            setEditProject={setEditProject}
            refresAllProjects={refresAllProjects}
            getAllProjects={getAllProjects}
          />
        </div>
        {/* Current Projects List */}

        <ProjectsListSection
          title="Current Projects"
          filteredProjects={filteredCurrentProjects}
          classNames={classNames}
          editProject={editProject}
          setEditProject={setEditProject}
          setNewProject={setNewProject}
          setId={setId}
          setModalHasRender={setModalHasRender}
          setOpenDeleteModal={setOpenDeleteModal}
          setProjectTitle={setProjectTitle}
          getAllProjects={getAllProjects}

        />

        <div >
          {/* Activity feed */}
          <ProjectsListSection
            title="Completed Projects"
            filteredProjects={filteredCompletedProjects}
            classNames={classNames}
            editProject={editProject}
            setEditProject={setEditProject}
            setNewProject={setNewProject}
            setId={setId}
            setModalHasRender={setModalHasRender}
            setOpenDeleteModal={setOpenDeleteModal}
            setProjectTitle={setProjectTitle}
            getAllProjects={getAllProjects}

          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
