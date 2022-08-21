import { useState, useContext } from "react";
import Form from "./Form";
import { addNewProjectService } from "../../services/project.services";
import { addNewActivityService } from "../../services/activity.services";
import { AuthContext } from "../../context/auth.context";
import { SocketContext } from "../../context/socket.context";

const NewProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const { handleCancelAddSaveFormBtn } = props;
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = async (e) => {
    const teamIds = team.map((user) => user._id);

    e.preventDefault();

    const body = {
      title: title,
      description: description,
      admin: user._id,
      team: teamIds,
      active: isActive,
    };
    socket.emit("newProject", body);
  };

  socket.on("errorMessage", setErrorMessage);

  return (
    <Form
      formTitle="Create a new Project"
      onSubmit={handleSubmit}
      cancelBtntext="Cancel"
      cancelBtnAction={handleCancelAddSaveFormBtn}
      acceptBtnText="Create"
      projectTitle={title}
      projectDescription={description}
      setTitle={setTitle}
      setDescription={setDescription}
      team={team}
      setTeam={setTeam}
      errorMessage={errorMessage}
    />
  );
};
export default NewProjectForm;
