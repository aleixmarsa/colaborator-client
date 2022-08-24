import { Link } from "react-router-dom";


import SortMenu from "../../menus/SortMenu";
import Project from "./Project";

const ProjectsListSection = (props) => {

  const {
    filteredProjects,
    setFilteredProjects,
    classNames,
    setProjectId,
    setDeleteModalHasRender,
    setProjectTitle,
    setEditModalHasRender
  } = props;


  return (

    <div className="drop-shadow-lg lg:min-w-0 lg:flex-1 mr-2 ml-2 xl:ml-0 gap-6 mt-5 mb-10 ">
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
                setProjectId={setProjectId}
                setDeleteModalHasRender={setDeleteModalHasRender}
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
