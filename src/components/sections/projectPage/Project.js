import { TrashIcon, PencilIcon } from "@heroicons/react/outline";

import Avatar from "react-avatar";

function Project(props) {
  const {
    project,
    setProjectId,
    setDeleteModalHasRender,
    setProjectTitle,
    setEditModalHasRender,
  } = props;

  const handleEditProjectBtn = (e, id) => {
    setProjectId(project._id);
    e.preventDefault();
    setEditModalHasRender(true);
    setDeleteModalHasRender(false);
  };

  const handleDeleteProjectBtn = (e, title, id) => {
    e.preventDefault();
    setDeleteModalHasRender(true);
    setProjectId(id);
    setProjectTitle(title);
  };

  return (
    <li
      className={`col-span-1 max-w bg-white rounded-sm drop-shadow-lg divide-y border-1 border-buttonHover list-none m-2 mb-4 `}
    >
      <div className="w-full flex items-center justify-between p-2 space-x-6 m-1">
        <div className="flex-1 truncate">
          <div className="flex flex-row justify-between items-center space-x-3">
            <div className="flex flex-row justify-between w-1/3">
              <h3 className="text-gray-900 text-sm font-medium truncate">
                {project.title}
              </h3>
            </div>
            <div className=" hidden xl:flex lg:flex flex-row items-center w-1/3">
              <div className="flex items-center space-x-2 text-black text-sm ">
                <span>Team:</span>
                <div className="flex flex-shrink-0 -space-x-1 ">
                  {project.team.map((member) => {
                    return (
                      <Avatar
                        key={member._id}
                        round
                        size="25"
                        textSizeRatio={1.75}
                        name={member.name}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hidden xl:flex flex-row items-center justify-center w-1/3 ">
              <div className="flex flex-col justify-center items-end  text-black text-sm space-x-2">
                <div>
                  <span>
                    <span>Created at: </span>
                    <span className="ml-2 text-gray-500">
                      {project.createdAt
                        .replace(/([^:]*$)/g, "")
                        .replace("T", " ")
                        .slice(0, -1)}
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    Last update:{" "}
                    <span className="text-gray-500">
                      {project.updatedAt
                        .replace(/([^:]*$)/g, "")
                        .replace("T", " ")
                        .slice(0, -1)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-end items-center w-1/8 pr-5">
              <button
                data-test-id="project-update-button"
                type="button"
                className="relative bg-white rounded-full focus:outline-none mr-1"
                onClick={(e) => handleEditProjectBtn(e, project._id)}
              >
                <PencilIcon
                  className="text-buttonOrange hover:text-buttonOrange-low h-5 w-5"
                  aria-hidden="true"
                />
              </button>
              <button
                data-test-id="project-delete-button"
                type="button"
                className="relative bg-white rounded-full focus:outline-none"
                onClick={(e) =>
                  handleDeleteProjectBtn(e, project.title, project._id)
                }
              >
                <TrashIcon
                  className="text-buttonOrange hover:text-buttonOrange-low h-5 w-5"
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
