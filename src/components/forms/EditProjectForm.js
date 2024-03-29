import { useState, useEffect } from "react";
import { useContext } from "react";

import Form from "./Form";
import {
  getProjectDetailsService,
  updateProjectService,
} from "../../services/project.services";
import { AuthContext } from "../../context/auth.context";
import { addNewActivityService } from "../../services/activity.services";
import { SocketContext } from "../../context/socket.context";

const EditProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { projectId, handleCancelAddSaveFormBtn } = props;

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

  useEffect(() => {
    getProject(projectId);
  }, [projectId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const projectBody = {
      projectId: projectId,
      title: title,
      description: description,
      team: team,
    };

    const activityBody = {
      title: "Project info edited",
      project: projectId,
      user: user._id,
    };
    socket.emit("newActivity", activityBody);
    
    socket.emit("updateProject", projectBody);
  };
  socket.on("errorMessage", setErrorMessage)



  return (
    <Form
      formTitle="Edit Project"
      onSubmit={handleSubmit}
      cancelBtntext="Cancel"
      cancelBtnAction={handleCancelAddSaveFormBtn}
      acceptBtnText="Save"
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
export default EditProjectForm;
