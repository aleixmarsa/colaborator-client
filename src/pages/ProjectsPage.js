import NavBar from "../components/navbar/NavBar";

import DeleteProjectModal from "../components/modals/DeleteProjectModal";
import ProjectManagementSection from "../components/sections/projectPage/ProjectManagementSection";
import ProjectsListSection from "../components/sections/projectPage/ProjectsListSection";
import ProjectActivitySection from "../components/sections/projectPage/ProjectActivitySection";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/socket.context";

import EditProjectModal from "../components/modals/EditProjectModal";
import CreateProjectModal from "../components/modals/CreateProjectModal";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const ProjectsPage = () => {
  const [projectId, setProjectId] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [editProjectForm, setEditProjectForm] = useState(false);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [filteredCurrentProjects, setFilteredCurrentProjects] = useState([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [modalHasRender, setModalHasRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editModalHasRender, setEditModalHasRender] = useState(false);
  const [createModalHasRender, setCreateModalHasRender] = useState(false);

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

  const newProjectListener = (project) => {
    const activityBody = {
      title: "Project created",
      project: project._id,
      user: user._id,
    };
    setEditProjectForm(false);
    setCreateModalHasRender(false);
    socket.emit("getCurrentProjects");
    socket.emit("joinProjectRoom", project._id.toString());
    if (project.admin === user._id) {
      socket.emit("newActivity", activityBody);
    }
  };

  const getProjectsListener = (allCurrentProjects) => {
    const allCurrentProjectsCopy = [...allCurrentProjects];
    setFilteredCurrentProjects([...allCurrentProjectsCopy]);
    setCurrentProjects([...allCurrentProjectsCopy]);
    setLoading(false);
  };

  const projectUpdatedListener = (updatedProject) => {
    const projectRoom = updatedProject._id.toString();
    setEditProjectForm(false);
    setEditModalHasRender(false);
    socket.emit("getCurrentProjects");
    socket.emit("leaveProjectRoom", projectRoom);
    updatedProject.team.forEach((member) => {
      if (member._id === user._id) {
        console.log("USER: ", member.name, "IS A MEMBER");
        socket.emit("joinProjectRoom", projectRoom);
      }
    });
  };

  const projectDeletedListener = (projecId) => {
    const activityBody = {
      title: "Project deleted",
      project: projectId,
      user: user._id,
    };
    setModalHasRender(false);
    console.log(
      "🚀 ~ file: ProjectsPage.js ~ line 101 ~ socket.on ~ projectId",
      projectId
    );
    socket.emit("getCurrentProjects");
    socket.emit("newActivity", activityBody);
  };

  const receiveAlertListener = () => {
    setHasNewMessage(true);
  };

  useEffect(() => {
    socket.on("receive_alert_message", receiveAlertListener);
    socket.on("newProjectCreated", newProjectListener);
    socket.on("getCurrentProjects", getProjectsListener);
    socket.on("projectUpdated", projectUpdatedListener);
    socket.on("projectDeleted", projectDeletedListener);

    return () => {
      socket.off("receive_alert_message", receiveAlertListener);
      socket.off("newProjectCreated", newProjectListener);
      socket.off("getCurrentProjects", getProjectsListener);
      socket.off("projectUpdated", projectUpdatedListener);
      socket.off("projectDeleted", projectDeletedListener);
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("getCurrentProjects");
    socket.emit("joinAllProjectsRoom");
  }, []);

  return (
    <div className="bg-neutral-50 h-screen">
      <NavBar hasNewMessage={hasNewMessage} filterProjects={filterProjects} />

      {!loading && modalHasRender && (
        <DeleteProjectModal
          projectId={projectId}
          projectTitle={projectTitle}
          setModalHasRender={setModalHasRender}
          modalHasRender={modalHasRender}
        />
      )}
      {!loading && editModalHasRender && (
        <EditProjectModal
          projectId={projectId}
          setEditModalHasRender={setEditModalHasRender}
          editModalHasRender={editModalHasRender}
        />
      )}
      {!loading && createModalHasRender && (
        <CreateProjectModal
          setCreateModalHasRender={setCreateModalHasRender}
          createModalHasRender={createModalHasRender}
        />
      )}

      {!loading ? (
        <div className="flex-grow w-full  max-w-10xl mx-auto xl:px-6 lg:flex">
          <div className="flex-1 flex-col min-w-0 bg-neutral-50 xl:flex xl:justify-between">
            <ProjectManagementSection
              setCreateModalHasRender={setCreateModalHasRender}
            />

            <div className="bg-neutral-50 lg:min-w-0 lg:flex-1">
              <div className="h-full px-2 sm:px-6 lg:px-8">
                <div className="relative h-full">
                  <ProjectsListSection
                    title="Current Projects"
                    filteredProjects={filteredCurrentProjects}
                    setFilteredProjects={setFilteredCurrentProjects}
                    classNames={classNames}
                    editProjectForm={editProjectForm}
                    setEditProjectForm={setEditProjectForm}
                    setProjectId={setProjectId}
                    setModalHasRender={setModalHasRender}
                    setProjectTitle={setProjectTitle}
                    setEditModalHasRender={setEditModalHasRender}
                  />
                </div>
              </div>
            </div>
          </div>

          <ProjectActivitySection currentProjects={currentProjects} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ProjectsPage;
