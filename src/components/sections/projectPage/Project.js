import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import Avatar from "react-avatar";
import { useState, useEffect } from "react";

const taskStatColorChange = (stat) => {
  if (stat === "TODO") return "bg-blue-200";
  if (stat === "PROGRESS") return "bg-amber-200";
  if (stat === "DONE") return "bg-green-200";
};

function Project(props) {
  const {
    project,
    editProject,
    setEditProject,
    setNewProject,
    setId,
    setModalHasRender,
    setProjectTitle,
    setOpenDeleteModal,
  } = props;

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
    <li
      className={`col-span-1  bg-white rounded-md shadow-xl divide-y divide-gray-200 list-none m-2 border-2 }`}
    >
      <div className="w-full flex items-center justify-between p-2 space-x-6 m-1">
        <div className="flex-1 truncate">
          <div className="flex flex-row justify-between items-center space-x-3">
            <div className="flex flex-row items-center w-1/4">
              <h3 className="text-gray-900 text-sm font-medium truncate">
                {project.title}
              </h3>
            </div>
            <div className="flex flex-row items-center w-1/4">
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
            <div className="flex flex-row items-center w-1/4">
              <p className="flex flex-col items-start text-gray-500 text-sm space-x-2">
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

            <div className="flex flex-row justify-between items-center">
              <button
                type="button"
                className="relative bg-white rounded-full focus:outline-none focus:ring-2 mr-1"
                onClick={(e) => handleEditProjectBtn(e, project._id)}
              >
                <PencilIcon
                  className="text-gray-300 hover:text-gray-400 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                className="relative bg-white rounded-full focus:outline-none focus:ring-2"
                onClick={(e) =>
                  handleDeleteProjectBtn(e, project.title, project._id)
                }
              >
                <TrashIcon
                  className="text-gray-300 hover:text-gray-400 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Project;
