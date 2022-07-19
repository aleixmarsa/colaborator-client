import { useState } from "react";
import axios from "axios";
import Form from "./Form";

const API_URL = process.env.REACT_APP_API_URL;

const NewProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: title,
      description: description,
    };
    axios
      .post(`${API_URL}/api/projects`, body)
      .then((response) => {
        setTitle("");
        setDescription("");
        props.handleCanceleAddSaveFormBtn(e);
        props.getAllProjects();
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
export default NewProjectForm;
