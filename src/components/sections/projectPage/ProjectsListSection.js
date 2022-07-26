import { Link } from "react-router-dom";
import { updateProjectService } from "../../../services/project.services";

import SortMenu from "../../menus/SortMenu";
import Project from "./Project";

const ProjectsListSection = (props) => {

  const {
    title,
    filteredProjects,
    setFilteredProjects,
    classNames,
    editProjectForm,
    setEditProjectForm,
    setNewProjectForm,
    setProjectId,
    setModalHasRender,
    setProjectTitle,
  } = props;

  let bgColor = "";
  if (title === "Current Projects") {
    bgColor = "bg-white";
  } else if (title === "Completed Projects") {
    bgColor = "bg-gray-100";
  }

  const handleMoveBtn = async (e, id) => {
    let isActive = false;
    if (title === "Completed Projects") {
      isActive = true;
    }
    e.preventDefault();
    const body = {
      active: isActive,
    };

    try {
      await updateProjectService(id, body);
      props.getAllProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="drop-shadow-md lg:min-w-0 lg:flex-1 ml-5 mr-5 gap-6 mt-5 mb-10 ">
      <div className="p-2 bg-stone-50 xl:mr-5">
        <div className=" flex items-center border-b-2 mb-5  pb-2  ">
          <h2 className="flex-1 xl:pl-24 text-xl">PROJECTS</h2>
          <SortMenu
            classNames={classNames}
            filteredProjects={filteredProjects}
            setFilteredProjects={setFilteredProjects}
          />
        </div>

        {filteredProjects.map((project) => {
            return (
            <Link key={project._id} to={`/${project._id}`}>
              <Project
                project={project}
                editProjectForm={editProjectForm}
                setEditProjectForm={setEditProjectForm}
                setNewProjectForm={setNewProjectForm}
                setId={setProjectId}
                setModalHasRender={setModalHasRender}
                setProjectTitle={setProjectTitle}
              />
            </Link>
          );
        })}
      </div>
    </div>

    
  );
};

export default ProjectsListSection;
