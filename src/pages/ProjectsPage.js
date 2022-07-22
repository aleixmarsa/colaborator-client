import NavBar from "../components/navbar/NavBar";

import DeletProjectModal from "../components/modals/DeleteProjectModal";
import Footer from "../components/footer/Footer";
import { AuthContext } from "../context/auth.context";
import ProjectManagementSection from "../components/sections/projectPage/ProjectManagementSection";
import CurrentProjectsSection from "../components/sections/projectPage/CurrentProjectsSection";
import CompletedProjectsSection from "../components/sections/projectPage/CompletedProjectsSection"
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
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projectsInProgress, setProjectsInProgress] = useState([]);
  const [newProject, setNewProject] = useState(false);

  const [id, setId] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [modalHasRender, setModalHasRender] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(true);
  const { user } = useContext(AuthContext);

  const filterProjects = (searchText) => {
    const projectsCopy = [...projectsInProgress];
    searchText !== ""
      ? setFilteredProjects(
          projectsCopy.filter((project) =>
            project.title.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : setFilteredProjects(projectsInProgress);
  };

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/colaborator-API/projects/`)
      .then((response) => {
        setProjectsInProgress(response.data);
        console.log("🚀 ~ file: ProjectsPage.js ~ line 76 ~ .then ~ response.data", response.data)
        setFilteredProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  const refresAllProjects = (response, action, id) => {

    let projectsCopy = [...projectsInProgress];
    if (action === "post") {
      projectsCopy = [...projectsInProgress, response.data];
    } else if (action === "delete") {
      const index = projectsCopy.findIndex((object) => {
        return object._id === id;
      });
      projectsCopy.splice(index, 1);
    }
    setProjectsInProgress(projectsCopy);
    setFilteredProjects(projectsCopy);
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
        <div className="flex-1 min-w-0 bg-white xl:flex ">
          {/* Project Managment*/}
          <ProjectManagementSection
            newProject={newProject}
            setNewProject={setNewProject}
            id={id}
            user={user}
            projectsInProgress={projectsInProgress}
            editProject={editProject}
            setEditProject={setEditProject}
            refresAllProjects={refresAllProjects}
            getAllProjects={getAllProjects}
          />
          {/* Current Projects List */}
          <CurrentProjectsSection
            filteredProjects={filteredProjects}
            classNames={classNames}
            editProject={editProject}
            setEditProject={setEditProject}
            setNewProject={setNewProject}
            setId={setId}
            setModalHasRender={setModalHasRender}
            setOpenDeleteModal={setOpenDeleteModal}
            setProjectTitle={setProjectTitle}
          />
        </div>
        {/* Activity feed */}
        <CompletedProjectsSection
          classNames={classNames}
          completedProjects={completedProjects}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
