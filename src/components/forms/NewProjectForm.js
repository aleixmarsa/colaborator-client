import { useState } from "react";
import axios from "axios";
import Form from "./Form";

const API_URL = process.env.REACT_APP_API_URL;

const NewProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);

  const handleSubmit = (e) => {
    const teamIds = team.map((user)=> user._id)
    console.log("🚀 ~ file: NewProjectForm.js ~ line 14 ~ handleSubmit ~ teamIds", teamIds)
    e.preventDefault(); 
    const body = {
      title: title,
      description: description,
      team: teamIds
      
    };
    axios
      .post(`${API_URL}/colaborator-API/projects/new-project`, body)
      .then((response) => {
        props.refresAllProjects(response, "post");
        setTitle("");
        setDescription("");
        setTeam([])
        props.handleCanceleAddSaveFormBtn(e);
      })
      .catch((error) => console.log(error));
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
