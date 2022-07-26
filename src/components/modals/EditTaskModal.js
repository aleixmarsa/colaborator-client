import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const EditTaskModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/colaborator-API/projects/card/edit/${props.editTaskId}`)
      .then((response) => {
        console.log("GET para la editcion de la tarjeta: ", response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setColor(response.data.color);
      })
      .catch((err) => console.log(err));
  }, [props.editTaskId]);

  const handleSubmitEditForm = (e) => {
    const body = {
      taskId: props.editTaskId,
      title: title,
      description: description,
      color: color,
    };

    // props.socket.emit("edit_task", body);
    // props.setOpenEditModal(false);

    axios
      .put(
        `${API_URL}/colaborator-API/projects/card/updateCard/${props.editTaskId}`,
        body
      )
      .then((response) => {
        props.socket.emit("edit_task", body);

        props.setEditModalHasRender(false);
        // props.getAllCards();
      });
  };

  return (
    <Transition.Root show={props.editModalHasRender} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setEditModalHasRender}
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
                            className="max-w-lg block w-full h-8 border-2 shadow-xl focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-green-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Description
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea
                            id="description"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            rows={3}
                            // onChange={(e) => setCardDescription(e.target.value)}
                            // value={cardDescription}
                            className="max-w-lg shadow-sm block w-full focus:ring focus:outline-none focus:ring-green-600 focus:border sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
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
                          className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleSubmitEditForm(props.EditTaskId)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => props.setEditModalHasRender(false)}
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
