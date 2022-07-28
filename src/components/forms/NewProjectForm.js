import { useState, useContext } from "react";
import Form from "./Form";
import { addNewProjectService } from "../../services/project.services";
import { addNewActivityService } from "../../services/activity.services";
import { AuthContext } from "../../context/auth.context";
import { SocketContext } from "../../context/socket.context";
import { useFormik, FormikProvider } from "formik";

const NewProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [teamError, setTeamError] = useState(false)
  const [isActive, setIsActive] = useState(true);
  const { getAllProjects, handleCancelAddSaveFormBtn } = props;

  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const handleSubmit = async (values) => {

    if (team.length) {
      setTeamError(false)
      const teamIds = team.map((user) => user._id);
      const body = {
        title: values.title,
        description: values.description,
        admin: user._id,
        team: teamIds,
        active: isActive,
      };

      const activity = {
        title: "Project created",
        project: null,
        user: user._id,
      };

      try {
        const responseProject = await addNewProjectService(body);
        activity.project = responseProject.data._id;
        await addNewActivityService(activity);
        socket.emit("render_projects");

        setTitle("");
        setDescription("");
        setTeam([]);
        getAllProjects();
        handleCancelAddSaveFormBtn();
      } catch (err) {
        console.log(err);
      }
    }else{
      setTeamError(true)
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      team: [],
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate: (values) => {
      let errors = {};


      if (values.title === "") {
        errors.title = "Project title is required";
      } else if (values.title.length < 4) {
        errors.title = "Project title must be at least 4 characters";
      }
      if (values.description === "") {
        errors.description = "Description is required";
      }
      return errors;
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form
        formTitle="Create a new Project"
        formik={formik}
        teamError = {teamError}
        team={team}
        setTeam={setTeam}
        cancelBtntext="Cancel"
        cancelBtnAction={handleCancelAddSaveFormBtn}
        acceptBtnText="Create"
      />
    </FormikProvider>
  );
};
export default NewProjectForm;
