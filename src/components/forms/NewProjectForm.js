import { useState } from "react";
import Form from "./Form";
import { addNewProjectService } from "../../services/project.services";

const NewProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    const teamIds = team.map((user) => user._id);

    e.preventDefault();
    const body = {
      title: title,
      description: description,
      team: teamIds,
      active: isActive,
    };

    try {
      const response = await addNewProjectService(body);
      console.log("🚀 ~ file: NewProjectForm.js ~ line 24 ~ handleSubmit ~ response", response)
      
      props.getAllProjects();
      setTitle("");
      setDescription("");
      setTeam([]);
      props.handleCanceleAddSaveFormBtn(e);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      formTitle="Create a new Project"
      onSubmit={handleSubmit}
      cancelBtntext="Cancel"
      cancelBtnAction={props.handleCanceleAddSaveFormBtn}
      acceptBtnText="New Project"
      projectTitle={title}
      projectDescription={description}
      setTitle={setTitle}
      setDescription={setDescription}
      team={team}
      setTeam={setTeam}
    />
  );
};
export default NewProjectForm;
