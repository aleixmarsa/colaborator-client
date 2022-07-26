import NewProjectForm from "../../forms/NewProjectForm";
import EditProjectForm from "../../forms/EditProjectForm";
import Avatar from "react-avatar";
import Button from "../../buttons/Button";
import { CollectionIcon } from "@heroicons/react/solid";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";

const ProjectManagementSection = (props) => {
  const {
    socket,
    projectId,
    projectsInProgress,
    newProjectForm,
    setNewProjectForm,
    editProjectForm,
    setEditProjectForm,
    getAllProjects,
  } = props;

  const { user } = useContext(AuthContext);
  console.log(
    "🚀 ~ file: ProjectManagementSection.js ~ line 22 ~ ProjectManagementSection ~ user",
    user
  );

  const handleNewProjectBtn = (e) => {
    e.preventDefault();
    setEditProjectForm(false);
    setNewProjectForm(true);
  };

  const handleCancelAddSaveFormBtn = () => {
    setEditProjectForm(false);
    setNewProjectForm(false);
  };
  return (
    <>
      {newProjectForm ? (
        <NewProjectForm
          socket={socket}
          handleNewProjectBtn={handleNewProjectBtn}
          handleCancelAddSaveFormBtn={handleCancelAddSaveFormBtn}
          getAllProjects={getAllProjects}
        />
      ) : editProjectForm ? (
        <EditProjectForm
          socket={socket}
          projectId={projectId}
          handleCancelAddSaveFormBtn={handleCancelAddSaveFormBtn}
          getAllProjects={getAllProjects}
        />
      ) : (
        <div className="xl:flex-shrink-0 xl:w-96 xl:border-r xl:border-gray-200 bg-white">
          <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-8">
                <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                  {/* Profile */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-12 w-12">
                      {/* <img
                      className="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                      alt=""
                    /> */}
                      <Avatar
                        round
                        size="50"
                        textSizeRatio={1.9}
                        // color="gray"
                        name={user.name}
                      />

                      {/* <UserCircleIcon className="h-12 w-12 text-green-500" /> */}
                    </div>
                    <div className="space-y-1 flex flex-col items-start ">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row xl:flex-col">
                    <Button
                      position="column"
                      type="button"
                      action={handleNewProjectBtn}
                      text="New Project"
                      color="green"
                    />
                    {/* <Button
                          position="column"
                          type="button"
                          text="Invite Team"
                          color="white"
                        /> */}
                  </div>
                </div>
                {/* Meta info */}
                <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                  <div className="flex items-center space-x-2">
                    <CollectionIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-gray-500 font-medium">
                      {projectsInProgress.length} Projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectManagementSection;
