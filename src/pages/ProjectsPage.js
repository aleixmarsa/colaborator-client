import NavBar from "../components/navbar/NavBar";

import DeletProjectModal from "../components/modals/DeleteProjectModal";
import Footer from "../components/footer/Footer";
import { AuthContext } from "../context/auth.context";
import ProjectManagementSection from "../components/sections/projectPage/ProjectManagementSection";
import ProjectsListSection from "../components/sections/projectPage/ProjectsListSection";
import {
  getAllCurrentProjectsService,
  getAllCompletedProjectsService,
} from "../services/project.services";

import { useState, useEffect, useContext } from "react";

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
      const response = await getAllCurrentProjectsService();
      setCurrentProjects(response.data);
      console.log(
        "🚀 ~ file: ProjectsPage.js ~ line 69 ~ getAllProjects ~ response.data",
        response.data
      );
      setFilteredCurrentProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await getAllCompletedProjectsService();
      setCompletedProjects(response.data);
      setFilteredCompletedProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const refreshAllProjects = (response, action, id) => {
  //   let currentProjectsCopy = [...currentProjects];
  //   let completedProjectsCopy = [...completedProjects];

  //   if (action === "post") {
  //     currentProjectsCopy = [...currentProjects, response.data];
  //   } else if (action === "delete") {
  //     const indexCurrent = currentProjectsCopy.findIndex((object) => {
  //       return object._id === id;
  //     });
  //     const indexCompleted = completedProjectsCopy.findIndex((object) => {
  //       return object._id === id;
  //     });
  //     if (indexCurrent !== -1) {
  //       currentProjectsCopy.splice(indexCurrent, 1);
  //     }
  //     if (indexCompleted !== -1) {
  //       completedProjectsCopy.splice(indexCompleted, 1);
  //     }
  //   }
  //   setCurrentProjects(currentProjectsCopy);
  //   setFilteredCurrentProjects(currentProjectsCopy);
  //   setCompletedProjects(completedProjectsCopy);
  //   setFilteredCompletedProjects(completedProjectsCopy);
  // };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar filterProjects={filterProjects} />
      {loading && <div>Loading...</div>}
      {!loading && modalHasRender && (
        <DeletProjectModal
          getAllProjects={getAllProjects}
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
                    className="text-indigo-600 font-semibold hover:text-indigo-900"
                  >
                    View all activity <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Activity feed */}
          {/* <ProjectsListSection
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
          /> */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProjectsPage;
