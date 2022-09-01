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

const EditProjectModal = (props) => {
  console.log(props);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [teamError, setTeamError] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const cancelButtonRef = useRef(null);

  const { projectId, setEditModalHasRender, editModalHasRender } = props;

  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const getProject = async (id) => {
    try {
      const response = await getProjectDetailsService(id);
      const oneProject = response.data;
      setTitle(oneProject.title);
      setDescription(oneProject.description);
      setTeam(oneProject.team);
    } catch (err) {
      console.log(err);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  
  const setErrorMessageListener = (message) => {
    setErrorMessage(message);
  };

  useEffect(() => {
    getProject(projectId);
  }, []);

  useEffect(() => {
    socket.on("errorMessage", setErrorMessageListener);
    return () => {
      socket.off("errorMessage", setErrorMessageListener);
    };
  }, [socket]);

  return (
    title && (
      <Formik
        initialValues={{ title: title, description: description, team: team }}
        onSubmit={(values) => {
          const title = values.title;
          const description = values.description;
          const teamIds = team.map((user) => user._id);
          const body = {
            projectId: projectId,
            title: title,
            description: description,
            admin: user._id,
            team: teamIds,
            active: true,
          };
          if (!team.length) {
            setTeamError("Select a team");
            return;
          } else if (!teamIds.includes(user._id)) {
            setTeamError("Your user must be included in the team");
            return;
          }
          setTeamError("");
          const activityBody = {
            title: "Project info edited",
            project: projectId,
            user: user._id,
          };
          socket.emit("newActivity", activityBody);

          socket.emit("updateProject", body);
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Enter a title"),
          description: Yup.string().max(
            200,
            "Description is too long - should be 200 chars maximun."
          ),
        })}
      >
        {(props) => {
        const { values, errors, handleChange, handleBlur, handleSubmit } =
          props;

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

              <div className="fixed z-10 inset-0 overflow-y-auto ">
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
                    <Dialog.Panel className="relative bg-white overflow-hidden rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                        <div className="pt-2 space-y-6 sm:pt-10 sm:space-y-5">
                          <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            action="#"
                            method="POST"
                          >
                            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Create a Project
                              </h3>
                              <div>
                                <div className="mt-1 sm:mt-5 space-y-6 sm:space-y-5">
                                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                                    <label
                                      htmlFor="title"
                                      className="text-sm font-medium text-gray-700 text-left"
                                    >
                                      Title
                                    </label>
                                    <div className="sm:mt-0 sm:col-span-3">
                                      <div className="relative max-w-lg flex rounded-md shadow-sm ">
                                        <input
                                          id="title"
                                          name="title"
                                          type="title"
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
                                  <div className="relative sm:border-t sm:border-gray-200">
                                    <SelectMenu
                                      team={team}
                                      setTeam={setTeam}
                                      teamError={teamError}
                                    />
                                    {teamError && (
                                      <div className="absolute -bottom-6 left-0 w-fit">
                                        <ExclamationCircleIcon
                                          className="h-4 w-4 text-red-500 inline"
                                          aria-hidden="true"
                                        />
                                        <p className=" ml-1 text-xs text-red-600 inline">
                                          {teamError}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-2">
                                    <label
                                      htmlFor="description"
                                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                      Description
                                    </label>
                                    <div className="relative mt-1 sm:mt-0 sm:col-span-3">
                                      <textarea
                                        id="description"
                                        name="description"
                                        type="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        rows={3}
                                        className={classNames(
                                          errors.description
                                            ? " outline outline-1 outline-red-500"
                                            : "focus:outline-buttonHover",
                                          "appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                                        )}
                                      />
                                      <CustomErrorMessage
                                        errors={errors.description}
                                        type="description"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {errorMessage && !errors.title && !teamError && (
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
                                  text="Save"
                                  color="mainColor"
                                />
                                <Button
                                  type="button"
                                  text="Cancel"
                                  color="white"
                                  action={() => setEditModalHasRender(false)}
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
        }}
      </Formik>
    )
  );
};

export default EditProjectModal;
