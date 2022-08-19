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

import EditProjectModal from "../components/modals/EditProjectModal";
import CreateProjectModal from "../components/modals/CreateProjectModal";

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

    const [editModalHasRender, setEditModalHasRender] = useState(false);
    const [createModalHasRender, setCreateModalHasRender] = useState(false);

    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);
    const {socket} = useContext(SocketContext);

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


    useEffect(() => {
        socket.on("receive_render_projects", (e) => {
            getAllProjects();
        });
        socket.on("receive_alert_message", (e) => {
            setHasNewMessage(true);
        });

    }, [socket]);

    const handleCancelAddSaveFormBtn = () => {
        setEditProjectForm(false);
        setNewProjectForm(false);
    };

  
  useEffect(() => {
    getAllProjects();
  }, []);

    return (
        <div className="bg-neutral-50 h-screen">
            <NavBar hasNewMessage={hasNewMessage} filterProjects={filterProjects} />

            {loading && <div>Loading...</div>}

            {
                !loading && modalHasRender && (
                    <DeletProjectModal
                        projectId={projectId}
                        getAllProjects={getAllProjects}
                        projectTitle={projectTitle}
                        setModalHasRender={setModalHasRender}
                        modalHasRender={modalHasRender}
                    />
                )
            }
            {
                !loading && editModalHasRender && (
                    <EditProjectModal
                        getAllProjects={getAllProjects}
                        projectId={projectId}
                        handleCancelAddSaveFormBtn={handleCancelAddSaveFormBtn}
                        setEditModalHasRender={setEditModalHasRender}
                        editModalHasRender={editModalHasRender}
                    />
                )
            }
            {
                !loading && createModalHasRender && (
                    <CreateProjectModal 
                        setCreateModalHasRender={setCreateModalHasRender}
                        createModalHasRender={createModalHasRender}
                    />
                )
            }

        {
            <div className="flex-grow w-full  max-w-10xl mx-auto xl:px-6 lg:flex">
                <div className="flex-1 flex-col min-w-0 bg-neutral-50 xl:flex xl:justify-between">

                    <div className="border-b-2 border-gray-200 pb-4">
                        <ProjectManagementSection
                            newProjectForm={newProjectForm}
                            setNewProjectForm={setNewProjectForm}
                            projectId={projectId}
                            projectsInProgress={currentProjects}
                            editProjectForm={editProjectForm}
                            setEditProjectForm={setEditProjectForm}
                            getAllProjects={getAllProjects}
                            createModalHasRender={createModalHasRender}
                            setCreateModalHasRender={setCreateModalHasRender}
                            setModalHasRender={setModalHasRender}
                        />
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
                                    getAllProjects={getAllProjects}
                                    setEditModalHasRender={setEditModalHasRender}
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
