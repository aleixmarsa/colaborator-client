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
  const { projectId, handleCancelAddSaveFormBtn, getAllProjects } = props;


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

    props.socket.emit("edit_project", body);
    handleCancelAddSaveFormBtn(e);


    // try {
    //   await updateProjectService(projectId, body);
    //   handleCancelAddSaveFormBtn(e);
    //   getAllProjects();
    // } catch (err) {
    //   console.log(err);
    // }
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
