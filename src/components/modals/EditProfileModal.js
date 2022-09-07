import { Fragment, useEffect, useRef, useState } from "react";
import { useContext } from "react";

import SelectMenu from "../menus/SelectMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import { Dialog, Transition } from "@headlessui/react";
import CustomErrorMessage from "../messages/CustomErrorMessage";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import Button from "../buttons/Button";
import { getProjectDetailsService } from "../../services/project.services";
import { AuthContext } from "../../context/auth.context";
import { SocketContext } from "../../context/socket.context";

const EditProfileModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [teamError, setTeamError] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const cancelButtonRef = useRef(null);

  const { userId, setEditProfileModalHasRender } = props;

  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-2 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {/* <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      coming soon...
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Button
                    type="button"
                    text="Cancel"
                    color="white"
                    action={() => setEditProfileModalHasRender(false)}
                  >
                    Cancel
                  </Button>
                </div> */}
                <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                          <div className="pt-2 space-y-6 sm:pt-10 sm:space-y-5">
                            <form
                              data-test-id="update-project-form"
                              onSubmit=""
                              className="space-y-6"
                              action="#"
                              method="POST"
                            >
                              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  Edit profile:{" "}
                                  <span className="text-gray-400">{title}</span>
                                </h3>
                                <div>
                                  <div className="mt-1 sm:mt-5 space-y-6 sm:space-y-5">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                                      <label
                                        htmlFor="title"
                                        className="text-sm font-medium text-gray-700 text-left"
                                      >
                                        Name
                                      </label>
                                      <div className="sm:mt-0 sm:col-span-3">
                                        <div className="relative max-w-lg flex rounded-md shadow-sm ">
                                          <input
                                            id="name"
                                            name="name"
                                            type="name"
                                            onChange=""
                                            onBlur=""
                                            value={user.name}
                                            required
                                            // className={classNames(
                                            //   errors.title
                                            //     ? " outline outline-1 outline-red-500"
                                            //     : "focus:outline-buttonHover",
                                            //   "appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                                            // )}
                                          />
                                          {/* <CustomErrorMessage
                                            errors={errors.title}
                                            type="title" */}
                                          {/* /> */}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-2">
                                      <label
                                        htmlFor="role"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                      >
                                        Role
                                      </label>
                                      <div className="relative mt-1 sm:mt-0 sm:col-span-3">
                                        <input
                                          id="role"
                                          name="role"
                                          type="role"
                                          value={user.role}
                                          onChange=""
                                          onBlur=""
                                          rows={3}
                                          // className={classNames(
                                          //   errors.description
                                          //     ? " outline outline-1 outline-red-500"
                                          //     : "focus:outline-buttonHover",
                                          //   "appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                                          // )}
                                        />
                                        {/* <CustomErrorMessage
                                          errors={errors.description}
                                          type="description"
                                        /> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* {errorMessage && !errors.title && !teamError && (
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
                              )} */}
                              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Button
                                  type="submit"
                                  text="Save"
                                  color="mainColor"
                                />
                                <Button
                                  type="button"
                                  text="Cancel"
                                  color="white"
                                  action={() => setEditProfileModalHasRender(false)}
                                />
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
};

export default EditProfileModal;
