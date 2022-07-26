import Button from "../buttons/Button";
import { useState } from "react";
import SelectMenu from "../menus/SelectMenu";
const Form = (props) => {
  const {
    formTitle,
    onSubmit,
    cancelBtntext,
    cancelBtnAction,
    acceptBtnText,
    projectTitle,
    projectDescription,
    setTitle,
    setDescription,
    team,
    setTeam
  } = props;

  return (
    <div className="xl:flex-shrink-0 xl:w-96 xl:border-r xl:border-gray-200 bg-white">
      <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-full">
                  <h1 className="flex-1 text-lg font-medium">{formTitle}</h1>
                  <form
                    className="space-y-8 divide-y divide-gray-200 "
                    onSubmit={onSubmit}
                  >
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                      <div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Title
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <div className="max-w-lg flex rounded-md shadow-sm ">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  onChange={(e) => setTitle(e.target.value)}
                                  value={projectTitle}
                                  className="flex-1 block w-full focus:ring focus:outline-none focus:ring-green-600 focus:border sm:text-sm border border-gray-300 rounded-md"
                                />
                              </div>
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
                                rows={3}
                                onChange={(e) => setDescription(e.target.value)}
                                value={projectDescription}
                                className="max-w-lg shadow-sm block w-full focus:ring focus:outline-none focus:ring-green-600 focus:border sm:text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <SelectMenu team={team} setTeam={setTeam}/>
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
                          color="green"
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
