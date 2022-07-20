import { useState } from "react";
import axios from "axios";
import Form from "./Form";

const API_URL = process.env.REACT_APP_API_URL;

const FormNewProject = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: title,
      description: description,
    };
    axios
      .post(`${API_URL}/colaborator-API/projects/new-project`, body)
      .then((response) => {
        props.refresAllProjects(response, "post");
        setTitle("");
        setDescription("");
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
    />
  );
};
export default FormNewProject;
