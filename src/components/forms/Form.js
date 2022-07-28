import Button from "../buttons/Button";
import SelectMenu from "../menus/SelectMenu";
import { Field, ErrorMessage } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const Form = (props) => {
  const {
    formTitle,
    formik,
    onSubmit,
    teamError,
    cancelBtntext,
    cancelBtnAction,
    acceptBtnText,
    projectTitle,
    projectDescription,
    setTitle,
    setDescription,
    team,
    setTeam,
  } = props;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="h-full py-6 sm:pl-6 lg:pl-8 xl:pl-0">
      <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-full">
                  <h1 className="flex-1 text-lg font-medium">{formTitle}</h1>
                  <form
                    className="space-y-8 divide-y divide-gray-200 "
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                      <div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="title"
                              className="text-sm font-medium text-gray-700 text-left"
                            >
                              Title
                            </label>
                            <br />
                            <div className="sm:mt-0 sm:col-span-3">
                              <div className="max-w-lg relative  flex rounded-md shadow-sm ">
                                <Field
                                  type="text"
                                  name="title"
                                  id="title"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.title}
                                  className={classNames(
                                    formik.errors.title
                                      ? "focus:outline-red-500"
                                      : "focus:outline-buttonHover",
                                    "flex-1 block w-full focus:outline  focus:border sm:text-sm border border-gray-300 rounded-md w-32"
                                  )}
                                />
                                {formik.errors.title ? (
                                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon
                                      className="h-5 w-5 text-red-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                              <ErrorMessage
                                component="div"
                                name="title"
                                className="mt-2 text-sm text-red-600"
                              />
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
                            <div className="sm:mt-0 sm:col-span-3">
                              <div className="max-w-lg relative  flex rounded-md shadow-sm ">
                                <Field
                                  as="textarea"
                                  id="description"
                                  name="description"
                                  rows={3}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.description}
                                  className={classNames(
                                    formik.errors.title
                                      ? "focus:outline-red-500"
                                      : "focus:outline-buttonHover",
                                    "max-w-lg shadow-sm block w-full focus:outline focus:border sm:text-sm border border-gray-300 rounded-md"
                                  )}
                                />
                                {formik.errors.description ? (
                                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon
                                      className="h-5 w-5 text-red-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                              <ErrorMessage
                                component="div"
                                name="description"
                                className="mt-2 w-full text-sm text-red-600"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <SelectMenu team={team} setTeam={setTeam} teamError={teamError}/>
                    </div>

                    <div className="pt-5">
                      <div className="flex justify-center">
                        <Button
                          position="row"
                          action={cancelBtnAction}
                          type="button"
                          text={cancelBtntext}
                          color="white"
                        />

                        <Button
                          position="row"
                          type="submit"
                          text={acceptBtnText}
                          color="mainColor"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
