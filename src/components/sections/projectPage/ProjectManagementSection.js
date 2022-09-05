
import Button from "../../buttons/Button";

import Avatar from "react-avatar";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";

const ProjectManagementSection = (props) => {
  const { setCreateModalHasRender } = props;

  const { user } = useContext(AuthContext);

  const handleNewProjectBtn = (e) => {
    e.preventDefault();
    setCreateModalHasRender(true);
  };

  return (
      <div className="border-b-2 border-gray-200 pb-1 mx-1">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-col mt-2">
            {/*Avatar con el nombre*/}
            <div className="flex flex-row">
              <Avatar round size="40" textSizeRatio={1.9} name={user.name} />
              <h3 className="ml-2 mt-3 font-semibold">{user.name}</h3>
            </div>

            {/*Rol del usuario */}
            <div className="mt-2">
              <p className="text-gray-400 text-left">{user.role}</p>
            </div>
          </div>

          {/*Boton de crear proyecto */}
          <div className="mt-2 mr-2 w-60">
            <Button
              position="column"
              type="button"
              action={handleNewProjectBtn}
              text="New Project"
              color="mainColor"
            />
          </div>
        </div>
      </div>
  );
};

export default ProjectManagementSection;
