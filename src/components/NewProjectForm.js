import { useState } from "react";
import axios from "axios";
import Form from "./Form";

const API_URL = "http://localhost:5005";

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
    <div className="xl:flex-shrink-0 xl:w-96 xl:border-r xl:border-gray-200 bg-white">
      <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
              {/* Profile */}
              <div className="flex items-center space-x-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewProjectForm;
