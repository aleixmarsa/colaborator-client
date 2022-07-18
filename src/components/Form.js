import Button from "./Button";
import { useState } from "react";

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
    setDescription
  } = props;

  return (
    <div className="w-full">
      <h1 className="flex-1 text-lg font-medium">{formTitle}</h1>
      <form className="space-y-8 divide-y divide-gray-200 " onSubmit={onSubmit}>
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
                      className="flex-1 block w-full focus:ring focus:outline-none focus:ring-lime-600 focus:border min-w-0 rounded-r-md sm:text-sm border border-gray-300 rounded-md"
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
                    className="max-w-lg shadow-sm block w-full focus:ring focus:outline-none focus:ring-lime-600 focus:border sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-center">
            {/* <button
        type="button"
        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-lime-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={props.handleCanceleAddSaveFormBtn}
      >
        Cancel
      </button> */}
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
              color="lime"
            />
            {/* <button
        type="submit"
        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Project
      </button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
