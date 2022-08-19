import { Link } from "react-router-dom";


import SortMenu from "../../menus/SortMenu";
import Project from "./Project";

const ProjectsListSection = (props) => {

  const {
    filteredProjects,
    getAllProjects,
    setFilteredProjects,
    classNames,
    editProjectForm,
    setEditProjectForm,
    setNewProjectForm,
    setProjectId,
    setModalHasRender,
    setProjectTitle,
    setEditModalHasRender
  } = props;


  return (

    <div className="drop-shadow-xl lg:min-w-0 lg:flex-1 ml-5 mr-5 gap-6 mt-5 mb-10 ">
      <div className="p-2 bg-white border border-black">
        <div className=" flex items-center border-b-2 mb-5 pb-4">
          <h2 className="flex-1 xl:pl-24 text-xl">PROJECTS</h2>
          <SortMenu
            classNames={classNames}
            filteredProjects={filteredProjects}
            setFilteredProjects={setFilteredProjects}
          />
        </div>

        {filteredProjects.map((project) => {
            return (
            <Link key={project._id} to={`/project/${project._id}`}>
              <Project
                project={project}
                editProjectForm={editProjectForm}
                setEditProjectForm={setEditProjectForm}
                setNewProjectForm={setNewProjectForm}
                setProjectId={setProjectId}
                setModalHasRender={setModalHasRender}
                setProjectTitle={setProjectTitle}
                setEditModalHasRender={setEditModalHasRender}
              />
            </Link>
          );
        })}
      </div>
    </div>

    
  );
};

export default ProjectsListSection;
