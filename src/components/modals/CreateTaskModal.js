import { Fragment, useEffect, useRef, useState } from "react";
import { useContext } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/auth.context";
import CustomErrorMessage from "../messages/CustomErrorMessage";
import { SocketContext } from "../../context/socket.context";
import Button from "../buttons/Button";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const CreateTaskModal = (props) => {
  const { user } = useContext(AuthContext);
  const cancelButtonRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { projectId, setCreateModalHasRender, createModalHasRender } =
    props;
  const [errorMessage, setErrorMessage] = useState(undefined);


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    socket.on("errorMessage", (message) => {
      setErrorMessage(message);
    });
  }, [socket]);


  return (
      <Formik
        initialValues={{
          title: "",
          description: "",
          color: "white",
          limitDate: "",
        }}
        onSubmit={(values) => {
          const title = values.title;
          const description = values.description;
          const color = values.color;
          const limitDate = values.limitDate;

          const taskBody = {
            title: title,
            description: description,
            state: "TODO",
            color: color,
            limitDate: limitDate,
            project: projectId,
          };

          const activityBody = {
      title: "Task created",
      project: projectId,
      user: user._id,
    };
    socket.emit("newActivity", activityBody);
    socket.emit("newTask", taskBody)
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Enter a title"),
          description: Yup.string().max(
            200,
            "Description is too long - should be 200 chars maximun."
          ),
          color: Yup.string(),
          limitDate: Yup.date().required("Set a limit date"),
        })}
      >
        {(props) => {
          const { values, errors, handleChange, handleBlur, handleSubmit } =
            props;

          return (
            <Transition.Root appear show={createModalHasRender} as={Fragment}>
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
                      <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full">
                        <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                          <div className="pt-2 space-y-6 sm:pt-10 sm:space-y-5">
                            <form
                              onSubmit={handleSubmit}
                              className="space-y-6"
                              action="#"
                              method="POST"
                            >
                              <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  Create a task
                                </h3>
                              </div>
                              <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                  <label
                                    htmlFor="title"
                                    className="text-sm font-medium text-gray-700 sm:mt-px"
                                  >
                                    Title
                                  </label>
                                  <div className="sm:mt-0 sm:col-span-3">
                                    <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                      <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        required
                                        className={classNames(
                                          errors.title
                                            ? " outline outline-1 outline-red-500"
                                            : "focus:outline-buttonHover",
                                          "appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                                        )}
                                      />
                                      <CustomErrorMessage
                                        errors={errors.title}
                                        type="title"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px"
                                  >
                                    Color
                                  </label>
                                  <div className="sm:mt-0 sm:col-span-3">
                                    <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                      <select
                                        id="color"
                                        name="color"
                                        value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classNames(
                                          errors.color
                                            ? " outline outline-1 outline-red-500"
                                            : "focus:outline-buttonHover",
                                          "appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                                        )}
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

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px"
                                  >
                                    Date Limit:
                                  </label>
                                  <div className="sm:mt-0 sm:col-span-3">
                                    <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                      <input
                                        type="date"
                                        name="limitDate"
                                        value={values.limitDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classNames(
                                          errors.limitDate
                                            ? " outline outline-1 outline-red-500"
                                            : "focus:outline-buttonHover",
                                          "appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                                        )}
                                      />
                                      <CustomErrorMessage
                                        errors={errors.limitDate}
                                        type="description"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {errorMessage &&
                                  !errors.title &&
                                  !errors.limitDate && (
                                    <div className="relative">
                                      <div className="absolute -bottom-2 left-1/3 w-full transform">
                                        <ExclamationCircleIcon
                                          className="h-4 w-4 text-red-500 inline"
                                          aria-hidden="true"
                                        />
                                        <p className=" ml-1 text-xs text-red-600 inline">
                                          {errorMessage}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                  <Button
                                    type="submit"
                                    text="Create"
                                    color="mainColor"
                                  />
                                  <Button
                                    type="button"
                                    text="Cancel"
                                    color="white"
                                    action={() => setCreateModalHasRender(false)}
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          );
        }}
      </Formik>
  );
};

export default CreateTaskModal;