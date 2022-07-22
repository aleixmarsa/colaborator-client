import NavBar from "../components/navbar/NavBar";

import DeletProjectModal from "../components/modals/DeleteProjectModal";
import Footer from "../components/footer/Footer";
import { AuthContext } from "../context/auth.context";
import ProjectManagementSection from "../components/sections/ProjectManagementSection";
import ProjectsListSection from "../components/sections/ProjectsListSection";
import {
  getAllCurrentProjectsService,
  getAllCompletedProjectsService,
} from "../services/project.services";

import { useState, useEffect, useContext } from "react";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const ProjectsPage = () => {
  const [editProject, setEditProject] = useState(false);
  const [filteredCurrentProjects, setFilteredCurrentProjects] = useState([]);
  const [filteredCompletedProjects, setFilteredCompletedProjects] = useState(
    []
  );
  const [currentProjects, setCurrentProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [newProject, setNewProject] = useState(false);
  const [id, setId] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [modalHasRender, setModalHasRender] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(true);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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

  const getAllProjects = async () => {
    try {
      const response = await getAllCurrentProjectsService(id);
      setCurrentProjects(response.data);
      setFilteredCurrentProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await getAllCompletedProjectsService(id);
      setCompletedProjects(response.data);
      setFilteredCompletedProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const refreshAllProjects = (response, action, id) => {
    let currentProjectsCopy = [...currentProjects];
    let completedProjectsCopy = [...completedProjects];

    if (action === "post") {
      currentProjectsCopy = [...currentProjects, response.data];
    } else if (action === "delete") {
      const indexCurrent = currentProjectsCopy.findIndex((object) => {
        return object._id === id;
      });
      const indexCompleted = completedProjectsCopy.findIndex((object) => {
        return object._id === id;
      });
      if (indexCurrent !== -1) {
        currentProjectsCopy.splice(indexCurrent, 1);
      }
      if (indexCompleted !== -1) {
        completedProjectsCopy.splice(indexCompleted, 1);
      }
    }
    setCurrentProjects(currentProjectsCopy);
    setFilteredCurrentProjects(currentProjectsCopy);
    setCompletedProjects(completedProjectsCopy);
    setFilteredCompletedProjects(completedProjectsCopy);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar filterProjects={filterProjects} />
      {loading && <div>Loading...</div>}
      {!loading && modalHasRender && (
        <DeletProjectModal
          refreshAllProjects={refreshAllProjects}
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
            refreshAllProjects={refreshAllProjects}
            getAllProjects={getAllProjects}
          />
        </div>
        {/* Current Projects List */}

        <ProjectsListSection
          title="Current Projects"
          filteredProjects={filteredCurrentProjects}
          setFilteredProjects={setFilteredCurrentProjects}
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

        <div>
          {/* Activity feed */}
          <ProjectsListSection
            title="Completed Projects"
            filteredProjects={filteredCompletedProjects}
            setFilteredProjects={setFilteredCompletedProjects}
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
