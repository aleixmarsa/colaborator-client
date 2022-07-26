import NavBar from "../components/navbar/NavBar";

import DeletProjectModal from "../components/modals/DeleteProjectModal";
import ProjectManagementSection from "../components/sections/projectPage/ProjectManagementSection";
import ProjectsListSection from "../components/sections/projectPage/ProjectsListSection";
import ProjectActivitySection from "../components/sections/projectPage/ProjectActivitySection";
import { getAllCurrentProjectsService } from "../services/project.services";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";

import io from "socket.io-client";

let socket;
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const ProjectsPage = () => {
  const [projectId, setProjectId] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [newProjectForm, setNewProjectForm] = useState(false);
  const [editProjectForm, setEditProjectForm] = useState(false);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [filteredCurrentProjects, setFilteredCurrentProjects] = useState([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const { user } = useContext(AuthContext);

  const [modalHasRender, setModalHasRender] = useState(false);
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
  };

  const getAllProjects = async () => {
    try {
      const response = await getAllCurrentProjectsService(user._id);
      setCurrentProjects(response.data);
      setFilteredCurrentProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const socketConnection = () => {
    const storedToken = localStorage.getItem("authToken");

    socket = io.connect("http://localhost:5005", {
      extraHeaders: { Authorization: `Bearer ${storedToken}` },
    });
    socket.on("receive_new_project", (e) => {
      getAllProjects();
    });
    socket.on("receive_edit_project", (e) => {
      getAllProjects();
    });
    socket.on("receive_delete_project", (e) => {
      getAllProjects();
    });
    socket.on("receive_alert_message", (e) => {
      console.log("MISSATGE REBUT");
      setHasNewMessage(true);
    });
  };

  useEffect(() => {
    getAllProjects();
    socketConnection();
  }, []);

  return (
    <div>
      <NavBar hasNewMessage={hasNewMessage} filterProjects={filterProjects} />

      {loading && <div>Loading...</div>}

      {!loading && modalHasRender && (
        <DeletProjectModal
          socket={socket}
          projectId={projectId}
          getAllProjects={getAllProjects}
          projectTitle={projectTitle}
          setModalHasRender={setModalHasRender}
          modalHasRender={modalHasRender}
        />
      )}

      {
        <div className="flex-grow w-full max-w-10xl mx-auto xl:px-6 lg:flex">
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
              <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0 mr-4">
                <div className="h-full relative" style={{ minHeight: "12rem" }}>
                  <ProjectManagementSection
                    socket={socket}
                    newProjectForm={newProjectForm}
                    setNewProjectForm={setNewProjectForm}
                    projectId={projectId}
                    projectsInProgress={currentProjects}
                    editProjectForm={editProjectForm}
                    setEditProjectForm={setEditProjectForm}
                    getAllProjects={getAllProjects}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-2 sm:px-6 lg:px-8">
                <div className="relative h-full" style={{ minHeight: "36rem" }}>
                  <ProjectsListSection
                    title="Current Projects"
                    filteredProjects={filteredCurrentProjects}
                    setFilteredProjects={setFilteredCurrentProjects}
                    classNames={classNames}
                    editProjectForm={editProjectForm}
                    setEditProjectForm={setEditProjectForm}
                    setNewProjectForm={setNewProjectForm}
                    setProjectId={setProjectId}
                    setModalHasRender={setModalHasRender}
                    setProjectTitle={setProjectTitle}
                    getAllProjects={getAllProjects}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
            <div className="h-full pl-6 py-6 lg:w-80">
              <div className="h-full relative" style={{ minHeight: "16rem" }}>
                <ProjectActivitySection currentProjects={currentProjects} />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ProjectsPage;
