import NewProjectForm from "../../forms/NewProjectForm";
import EditProjectForm from "../../forms/EditProjectForm";
import Button from "../../buttons/Button";

import Avatar from "react-avatar";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";

const ProjectManagementSection = (props) => {
  const {
    projectId,
    newProjectForm,
    setNewProjectForm,
    editProjectForm,
    setEditProjectForm,
  } = props;

  const { user } = useContext(AuthContext);

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
          handleNewProjectBtn={handleNewProjectBtn}
          handleCancelAddSaveFormBtn={handleCancelAddSaveFormBtn}
        />
      ) : editProjectForm ? (
        <EditProjectForm
          projectId={projectId}
          handleCancelAddSaveFormBtn={handleCancelAddSaveFormBtn}
        />
      ) : (
        <>
          {/*Avatar con el nombre*/}
          <div className="flex flex-row">
            <Avatar round size="40" textSizeRatio={1.9} name={user.name} />

            <h3 className="ml-2 mt-3">{user.name}</h3>
          </div>

          {/*Rol del usuario */}
          <div className="mt-2">
            <p className="text-gray-400 text-left">{user.role}</p>
          </div>

          {/*Boton de crear proyecto */}
          <div className="mt-6 w-40">
            <Button
              position="column"
              type="button"
              action={handleNewProjectBtn}
              text="New Project"
              color="mainColor"
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProjectManagementSection;
