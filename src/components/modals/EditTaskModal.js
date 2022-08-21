import { Fragment, useEffect, useRef, useState } from "react";
import { useContext } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { getTaskDetailsService } from "../../services/task.services";
import { addNewActivityService } from "../../services/activity.services";
import { updateTaskService } from "../../services/task.services";
import { AuthContext } from "../../context/auth.context";

import { SocketContext } from "../../context/socket.context";

const EditTaskModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [cardLimitDate, setCardLimitDate] = useState("");
  const { user } = useContext(AuthContext);
  const cancelButtonRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { editTaskId, projectId, setEditModalHasRender, editModalHasRender } =
    props;
  const getTask = async (editTaskId) => {
    try {
      const response = await getTaskDetailsService(editTaskId);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setColor(response.data.color);
      setCardLimitDate(response.data.limitDate); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTask(editTaskId);
  }, []);

  const handleSubmitEditForm = async (e) => {
    const taskBody = {
      taskId: editTaskId,
      title: title,
      description: description,
      color: color,
      limitDate: cardLimitDate,
      project: projectId,
    };

    const activityBody = {
      title: "Task info edited",
      project: projectId,
      user: user._id,
    };

    socket.emit("newActivity", activityBody);
    socket.emit("updateTask", taskBody);
  };

  return (
    <Transition.Root appear show={editModalHasRender} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setEditModalHasRender}
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
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Edit your task here
                      </h3>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Title
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="max-w-lg block w-full h-8 focus:outline focus:outline-buttonHover shadow-xl sm:max-w-xs sm:text-sm rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Color
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="max-w-lg block focus:outline focus:outline-buttonHover w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="white">White</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="blue">Blue</option>
                            <option value="gray">Gray</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Date Limit:
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="date"
                            name="limitDate"
                            className="max-w-lg blockfocus:outline focus:outline-buttonHover w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => setCardLimitDate(e.target.value)}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-mainColor text-base font-medium text-white hover:bg-secundaryColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleSubmitEditForm(editTaskId)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline focus:outline-buttonHover sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setEditModalHasRender(false)}
                    ref={cancelButtonRef}
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

export default EditTaskModal;
