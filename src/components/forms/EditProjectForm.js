import { useState, useEffect } from "react";
import SortMenu from "../menus/SortMenu";
import Form from "./Form";
import {
  getProjectDetailsService,
  updateProjectService,
} from "../../services/project.services";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { addNewActivityService } from "../../services/activity.services";
import { SocketContext } from "../../context/socket.context";

const EditProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const { projectId, handleCancelAddSaveFormBtn} = props;
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext)

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      projectId:projectId,
      title: title,
      description: description,
      team:team
    };

    const activity = {
      title: "Project info edited",
      project: projectId,
      user: user._id,
    };

    // props.socket.emit("edit_project", body);
    // // handleCancelAddSaveFormBtn(e);

    try {
      await updateProjectService(projectId, body);
      await addNewActivityService(activity);
      socket.emit("edit_project", body);
      handleCancelAddSaveFormBtn(e);
      // getAllProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      formTitle="Edit Project"
      onSubmit={handleSubmit}
      cancelBtntext="Cancel"
      cancelBtnAction={handleCancelAddSaveFormBtn}
      acceptBtnText="Save Changes"
      projectTitle={title}
      projectDescription={description}
      setTitle={setTitle}
      setDescription={setDescription}
      team={team}
      setTeam={setTeam}
    />
  );
};
export default EditProjectForm;
