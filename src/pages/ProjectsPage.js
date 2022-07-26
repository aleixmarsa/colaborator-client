import NavBar from "../components/navbar/NavBar";

import DeletProjectModal from "../components/modals/DeleteProjectModal";
import ProjectManagementSection from "../components/sections/projectPage/ProjectManagementSection";
import ProjectsListSection from "../components/sections/projectPage/ProjectsListSection";
import {
  getAllCurrentProjectsService,
  getAllCompletedProjectsService,
} from "../services/project.services";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState, useEffect } from "react";

import io from "socket.io-client";

let socket;
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const activityItems = [
  {
    project: "Workcation",
    commit: "2d89f0c8",
    environment: "production",
    time: "1h",
  },
  // More items...
];

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

  const [filteredCompletedProjects, setFilteredCompletedProjects] = useState(
    []
  );
  const [completedProjects, setCompletedProjects] = useState([]);

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
      const response = await getAllCurrentProjectsService(user._id);
      setCurrentProjects(response.data);
      setFilteredCurrentProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await getAllCompletedProjectsService(user._id);
      setCompletedProjects(response.data);
      setFilteredCompletedProjects(response.data);
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
            setNewProjectForm={setNewProjectForm}
            setProjectId={setProjectId}
            setModalHasRender={setModalHasRender}
            setProjectTitle={setProjectTitle}
            getAllProjects={getAllProjects}
            />

            <div>
            {/* Activity feed */}
            <div className="drop-shadow-md  lg:min-w-0 lg:flex-1  mr-5 gap-6 mt-5 mb-10 ">
                <div className="p-6 pt-2 bg-stone-50">
                <div className=" flex items-center border-b-2 mb-5  pb-2  ">
                    <h2 className="flex-1 text-xl">ACTIVITY</h2>
                </div>
                <div>
                    <ul role="list" className="divide-y divide-gray-200">
                    {activityItems.map((item) => (
                        <li key={item.commit} className="py-4">
                        <div className="flex space-x-3">
                            <img
                            className="h-6 w-6 rounded-full"
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                            alt=""
                            />
                            <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">You</h3>
                                <p className="text-sm text-gray-500">{item.time}</p>
                            </div>
                            <p className="text-sm text-gray-500">
                                Deployed {item.project} ({item.commit} in master) to{" "}
                                {item.environment}
                            </p>
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                    <div className="py-4 text-sm border-t border-gray-200">
                    <a
                        href="#"
                        className="text-green-600 font-semibold hover:text-green-900"
                    >
                        View all activity <span aria-hidden="true">&rarr;</span>
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default ProjectsPage;
