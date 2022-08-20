import { Fragment, useRef, useState, useContext, useEffect } from "react";

import { addNewProjectService } from "../../services/project.services";
import { addNewActivityService } from "../../services/activity.services";
import { AuthContext } from "../../context/auth.context";
import { SocketContext } from "../../context/socket.context";

import SelectMenu from "../menus/SelectMenu";

import { Dialog, Transition } from "@headlessui/react";

const CreateProjectModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const cancelButtonRef = useRef(null);

  const {
    getAllProjects,
    handleCancelAddSaveFormBtn,
    setCreateModalHasRender,
    createModalHasRender,
  } = props;

  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmitCreateProject = async (e) => {
    const teamIds = team.map((user) => user._id);
    e.preventDefault();
    const body = {
      title: title,
      description: description,
      admin: user._id,
      team: teamIds,
      active: isActive,
    };

    const activity = {
      title: "Project created",
      project: null,
      user: user._id,
    };

    try {
      const responseProject = await addNewProjectService(body);
      activity.project = responseProject.data._id;
      await addNewActivityService(activity);
      socket.emit("render_projects");

      setTitle("");
      setDescription("");
      setTeam([]);
      getAllProjects();
      handleCancelAddSaveFormBtn(e);
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMessage(err.response.data.message);
      }
    }

    setCreateModalHasRender(false);
  };

  return (
    <Transition.Root show={createModalHasRender} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setCreateModalHasRender}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="pt-2 space-y-6 sm:pt-10 sm:space-y-5">
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Create a Project
                      </h3>
                      <div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                            <label
                              htmlFor="title"
                              className="text-sm font-medium text-gray-700 text-left"
                            >
                              Title
                            </label>
                            <br />
                            <div className="sm:mt-0 sm:col-span-3">
                              <div className="max-w-lg flex rounded-md shadow-sm ">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  onChange={(e) => setTitle(e.target.value)}
                                  value={title}
                                  className="flex-1 block w-full focus:outline focus:outline-buttonHover focus:border sm:text-sm border border-gray-300 rounded-md w-32"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Description
                            </label>
                            <br />
                            <div className="mt-1 sm:mt-0 sm:col-span-3">
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className="max-w-lg shadow-sm block w-full focus:outline focus:outline-buttonHover focus:border sm:text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <SelectMenu team={team} setTeam={setTeam} />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-mainColor text-base font-medium text-white hover:bg-secundaryColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => handleSubmitCreateProject(e)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline focus:outline-buttonHover sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setCreateModalHasRender(false)}
                    //ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateProjectModal;
