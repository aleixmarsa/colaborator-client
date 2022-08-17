import NavBar from "../components/navbar/NavBar";

import DeletProjectModal from "../components/modals/DeleteProjectModal";
import ProjectManagementSection from "../components/sections/projectPage/ProjectManagementSection";
import ProjectsListSection from "../components/sections/projectPage/ProjectsListSection";
import ProjectActivitySection from "../components/sections/projectPage/ProjectActivitySection";

import { getAllCurrentProjectsService } from "../services/project.services";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/socket.context";

import io from "socket.io-client";

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
  const [modalHasRender, setModalHasRender] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

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


  useEffect(() => {
    socket.on("receive_alert_message", (e) => {
      setHasNewMessage(true);
    });

    socket.on("newProjectCreated", (project) => {
      console.log(
        "🚀 ~ file: ProjectsPage.js ~ line 67 ~ socket.on ~ project",
        project
      );
      setEditProjectForm(false);
      setNewProjectForm(false);
      socket.emit("getCurrentProjects");
      socket.emit("joinProjectRoom", project._id.toString());
    });

    socket.on("getCurrentProjects", (allCurrentProjects) => {
      const allCurrentProjectsCopy = [...allCurrentProjects];
      setFilteredCurrentProjects([...allCurrentProjectsCopy]);
      setCurrentProjects([...allCurrentProjectsCopy]);
      setLoading(false);
    });

    socket.on("projectUpdated", (updatedProject) => {
      const projectRoom = updatedProject._id.toString()
      setEditProjectForm(false);
      setNewProjectForm(false);
      socket.emit("getCurrentProjects");
      socket.emit("leaveProjectRoom", projectRoom)
      updatedProject.team.forEach((member) => {
        if (member._id === user._id) {
          console.log("USER: ", member.name, "IS A MEMBER");
          socket.emit("joinProjectRoom", projectRoom);
        }
      });
    });

    socket.on("projectDeleted", (projectId)=>{
      console.log("🚀 ~ file: ProjectsPage.js ~ line 94 ~ socket.on ~ projectId", projectId)
      setModalHasRender(false);
      socket.emit("leaveProjectRoom", projectId)
      socket.emit("getCurrentProjects");
      
    })

    
  }, [socket]);

  useEffect(() => {
    socket.emit("getCurrentProjects");
    socket.emit("joinAllProjectsRoom");
  }, []);

  // const socketConnection = () => {
  //   socket = io.connect(API_URL, {
  //     extraHeaders: { Authorization: `Bearer ${storedToken}` },
  //   });
  // }

  return (
    <div className="bg-neutral-50 h-screen">
      <NavBar hasNewMessage={hasNewMessage} filterProjects={filterProjects} />

      {loading && <div>Loading...</div>}

      {!loading && modalHasRender && (
        <DeletProjectModal
          projectId={projectId}
          projectTitle={projectTitle}
          setModalHasRender={setModalHasRender}
          modalHasRender={modalHasRender}
        />
      )}

      {
        <div className="flex-grow w-full  max-w-10xl mx-auto xl:px-6 lg:flex">
          <div className="flex-1 min-w-0 bg-neutral-50 xl:flex">
            <div className="border-b bg-neutral-50 border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200">
              <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0 mr-4">
                <div className=" relative" style={{ minHeight: "12rem" }}>
                  <ProjectManagementSection
                    newProjectForm={newProjectForm}
                    setNewProjectForm={setNewProjectForm}
                    projectId={projectId}
                    projectsInProgress={currentProjects}
                    editProjectForm={editProjectForm}
                    setEditProjectForm={setEditProjectForm}
                  />
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-2 sm:px-6 lg:px-8">
                <div className="relative h-full">
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
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
            <div className="h-full pl-6 py-6 lg:w-80">
              <div className="h-full  relative">
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
