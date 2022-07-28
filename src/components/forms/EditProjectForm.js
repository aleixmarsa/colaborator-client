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
import { useFormik, FormikProvider } from "formik";

const EditProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [teamError, setTeamError] = useState(false);

  const { projectId, handleCancelAddSaveFormBtn } = props;

  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const getProject = async (id) => {
    try {
      const response = await getProjectDetailsService(id);
      const oneProject = response.data;
      setTitle(oneProject.title);
      setDescription(oneProject.description);
      setTeam([]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProject(projectId);
  }, [projectId]);

  const handleSubmit = async (values) => {
    if (team.length) {
      const body = {
        projectId: projectId,
        title: values.title,
        description: values.description,
        team: team,
      };

      const activity = {
        title: "Project info edited",
        project: projectId,
        user: user._id,
      };

      try {
        await updateProjectService(projectId, body);
        await addNewActivityService(activity);
        socket.emit("render_projects");

        handleCancelAddSaveFormBtn();
      } catch (err) {
        console.log(err);
      }
    } else {
      setTeamError(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: title,
      description: description,
      team: [],
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
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
        formTitle="Edit Project"
        formik={formik}
        teamError={teamError}
        team={team}
        setTeam={setTeam}
        cancelBtntext="Cancel"
        cancelBtnAction={handleCancelAddSaveFormBtn}
        acceptBtnText="Save"
      />
    </FormikProvider>
  );
};
export default EditProjectForm;
