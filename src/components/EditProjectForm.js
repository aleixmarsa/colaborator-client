import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";

const API_URL = process.env.REACT_APP_API_URL;

const EditProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/colaborator-API/projects/${props.id}`)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
  }, [props.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: title,
      description: description,
    };

    axios.put(`${API_URL}/colaborator-API/projects/${props.id}`, body).then((response) => {
      props.handleCanceleAddSaveFormBtn(e);
      props.getAllProjects();
    });
  };

  return (
    <Form
      formTitle="Edit Project"
      onSubmit={handleSubmit}
      cancelBtntext="Cancel"
      cancelBtnAction={props.handleCanceleAddSaveFormBtn}
      acceptBtnText="Save Changes"
      projectTitle={title}
      projectDescription={description}
      setTitle={setTitle}
      setDescription={setDescription}
    />
  );
};
export default EditProjectForm;
