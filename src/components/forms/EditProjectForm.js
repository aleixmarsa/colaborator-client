import { useState, useEffect } from "react";
import SortMenu from "../menus/SortMenu";
import Form from "./Form";
import {
  getProjectDetailsService,
  updateProjectService,
} from "../../services/project.services";

const API_URL = process.env.REACT_APP_API_URL;

const EditProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const { id } = props;
  console.log(
    "🚀 ~ file: EditProjectForm.js ~ line 13 ~ EditProjectForm ~ id",
    id
  );

  const getProject = async (id) => {
    //TODO MIRAR QUE ES
    localStorage.getItem("authToken");
    try {
      const response = await getProjectDetailsService(id);
      const oneProject = response.data;
      setTitle(oneProject.title);
      setDescription(oneProject.description);
      //TODO NO SURTEN LES IMATGES QUAN EDITES UN PROJECTE  
      setTeam(oneProject.team);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProject(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: title,
      description: description,
    };

    try {
      await updateProjectService(props.id, body);
      props.handleCanceleAddSaveFormBtn(e);
      props.getAllProjects();
    } catch (err) {
      console.log(err);
    }
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
      team={team}
      setTeam={setTeam}
    />
  );
};
export default EditProjectForm;
