import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { useState } from "react";
import { updateProjectService } from "../../../services/project.services";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  SortAscendingIcon,
  PencilIcon,
  TrashIcon,
  FolderAddIcon,
  FolderRemoveIcon,
} from "@heroicons/react/solid";
import SortMenu from "../../menus/SortMenu";

const ProjectsListSection = (props) => {
  const {
    title,
    filteredProjects,
    setFilteredProjects,
    classNames,
    editProject,
    setEditProject,
    setNewProject,
    setId,
    setModalHasRender,
    setOpenDeleteModal,
    setProjectTitle,
    getAllProjects,
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

  const handleEditProjectBtn = (e, id) => {
    e.preventDefault();
    setEditProject(!editProject);
    setNewProject(false);
    setId(id);
  };

  const handleDeleteProjectBtn = (e, title, id) => {
    e.preventDefault();
    setModalHasRender(true);
    setOpenDeleteModal(true);
    setId(id);
    setProjectTitle(title);
  };
  return (
    <div className="bg-white lg:min-w-0 lg:flex-1 xl:border-r border-gray-200">
      <div className="pl-4 pr-6 pt-4 pb-4 border-b border-t  sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
        <div className="flex items-center">
          <h1 className="flex-1 text-lg font-medium">{title}</h1>
          <SortMenu
            classNames={classNames}
            filteredProjects={filteredProjects}
            setFilteredProjects={setFilteredProjects}
          />
        </div>
      </div>
      <ul
        role="list"
        className="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
      >
        {filteredProjects.map((project) => (
          <Link to={`/${project._id}/tasks`}>
          <li
            key={project._id}
            className={`relative pl-4 pr-6 py-2 ${bgColor} hover:bg-gray-50 sm:pl-6 lg:pl-8 xl:pl-6`}
          >
            <div className="flex items-center justify-between space-x-4">
              {/* Repo name and link */}
              <div className="min-w-0 space-y-3">
                <div className="flex items-center space-x-3">
                  <span
                    className={classNames(
                      project.active ? "bg-green-100" : "bg-yellow-100/70",
                      "h-4 w-4 rounded-full flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={classNames(
                        project.active ? "bg-green-400" : "bg-yellow-400",
                        "h-2 w-2 rounded-full"
                      )}
                    />
                  </span>
                    <h2 className="text-sm font-medium max-w-md truncate">{project.title} </h2>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm ">
                  <span>Team:</span>

                  <div className="flex flex-shrink-0 -space-x-1 ">
                    {project.team.map((member) => (
                      <Avatar
                        key={member._id}
                        round
                        size="25"
                        color="gray"
                        textSizeRatio={1.75}
                        name={member.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="sm:hidden">
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              {/* Repo meta info */}
              <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                <p className="flex items-center space-x-4">
                  {/* <a
                          href='#'
                          className="relative text-sm text-gray-500 hover:text-gray-900 font-medium"
                        >
                          Visit site
                        </a> */}

                  <button
                    type="button"
                    className="relative bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    onClick={(e) => handleMoveBtn(e, project._id)}
                  >
                    {project.active ? (
                      <FolderAddIcon
                        className="text-gray-300 hover:text-gray-400h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <FolderRemoveIcon
                        className="text-gray-300 hover:text-gray-400h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    className="relative bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    onClick={(e) => handleEditProjectBtn(e, project._id)}
                  >
                    <PencilIcon
                      className="text-gray-300 hover:text-gray-400h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    type="button"
                    className="relative bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    onClick={(e) =>
                      handleDeleteProjectBtn(e, project.title, project._id)
                    }
                  >
                    {/* <span className="sr-only">
                            {project.starred
                              ? "Add to favorites"
                              : "Remove from favorites"}
                          </span> */}
                    <TrashIcon
                      className="text-gray-300 hover:text-gray-400h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </p>
                <p className="flex flex-col items-start text-gray-500 text-sm space-x-2">
                  <span>{project.tech}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>
                    <span>Created at: </span>
                    <span className="ml-2">
                      {project.createdAt
                        .replace(/([^:]*$)/g, "")
                        .replace("T", " ")
                        .slice(0, -1)}
                    </span>
                  </span>
                  <span>
                    Last update:{" "}
                    {project.updatedAt
                      .replace(/([^:]*$)/g, "")
                      .replace("T", " ")
                      .slice(0, -1)}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  {/* <span>{project.location}</span> */}
                </p>
              </div>
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsListSection;
