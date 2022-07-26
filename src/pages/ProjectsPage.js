import NavBar from "../components/navbar/NavBar";

import DeletProjectModal from "../components/modals/DeleteProjectModal";
import ProjectManagementSection from "../components/sections/projectPage/ProjectManagementSection";
import ProjectsListSection from "../components/sections/projectPage/ProjectsListSection";
import ProjectActivitySection from "../components/sections/projectPage/ProjectActivitySection";
import {
  getAllCurrentProjectsService,
  getAllCompletedProjectsService,
} from "../services/project.services";
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

  // const [filteredCompletedProjects, setFilteredCompletedProjects] = useState(
  //   []
  // );
  // const [completedProjects, setCompletedProjects] = useState([]);

  const filterProjects = (searchText) => {
    let projectsCopy = [...currentProjects];
    searchText !== ""
      ? setFilteredCurrentProjects(
          projectsCopy.filter((project) =>
            project.title.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : setFilteredCurrentProjects(currentProjects);

    // projectsCopy = [...completedProjects];

    // searchText !== ""
    //   ? setFilteredCompletedProjects(
    //       projectsCopy.filter((project) =>
    //         project.title.toLowerCase().includes(searchText.toLowerCase())
    //       )
    //     )
    //   : setFilteredCompletedProjects(completedProjects);
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

    // try {
    //   const response = await getAllCompletedProjectsService(user._id);
    //   setCompletedProjects(response.data);
    //   setFilteredCompletedProjects(response.data);
    // } catch (err) {
    //   console.log(err);
    // }
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
      console.log("MISSATGE REBUT")
      setHasNewMessage(true)
    });
  };

  useEffect(() => {
    getAllProjects();
    socketConnection();
  }, []);

  return (

    <div className="flex flex-col h-screen">
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

        <div className="grid grid-cols-1 ml-5 mr-5 md:grid-cols-1 lg:grid-cols-3">
        

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


            <ProjectsListSection
            title="Current Projects"
            filteredProjects={filteredCurrentProjects}
            setFilteredProjects={setFilteredCurrentProjects}
            classNames={classNames}
            editProjectForm={editProjectForm}
            setEditProjectForm={setEditProjectForm}
            getAllProjects={getAllProjects}
          />
        </div>
        {/* Current Projects List */}

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

        <ProjectActivitySection currentProjects={currentProjects}/>
        
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProjectsPage;
