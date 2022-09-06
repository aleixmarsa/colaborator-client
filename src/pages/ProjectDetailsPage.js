import { useState, useEffect } from "react";
import { getProjectDetailsService } from "../services/project.services";
import { useParams, Link } from "react-router-dom";

import Avatar from "react-avatar";

import NavBar from "../components/navbar/NavBar";
import LateralBar from "../components/sections/LateralBar";

const ProjectDetailsPage = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([]);
  const { projectId } = useParams();

  const getProject = async (id) => {
    try {
      const response = await getProjectDetailsService(id);
      const oneProject = response.data;
      setTitle(oneProject.title);
      setDescription(oneProject.description);
      setTeam(oneProject.team);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProject(projectId);
  }, [projectId]);

  return (
    <div className="flex flex-col bg-neutral-50">
      <NavBar />
      <div className="flex flex-row">
        <LateralBar projectId={projectId} />

        <div className="flex flex-col flex-wrap w-screen mx-4 lg:mx-48 xl:mx-40 my-5">
          <h1 className="flex font-normal text-2xl xl:text-4xl pb-4 border-b-2 b-color-gray-200">
            {title}
          </h1>

          <div className="flex flex-col xl:flex-row lg:flex-row sm:flex-row items-start mb-6 mt-2">
            <h3 className="font-bold">Members: </h3>
            {team.map((member) => {
              return (
                <div key={member._id} className="ml-4">
                  <Avatar
                    round
                    size="30"
                    textSizeRatio={1.75}
                    name={member.name}
                  />
                  <span className="ml-1">{member.name}</span>
                </div>
              );
            })}
          </div>

          <h6 className=" text-xl  text-justify text-gray-600 max-w-full">
            {description}
          </h6>

          <div className="flex flex-col items-center lg:flex-row xl:flex-row justify-around  lg:mt-20 xl:mt-28">
            <div>
              <Link to={`/project/${projectId}/tasks`}>
                <img
                  className="mt-3"
                  src="/images/tasks_image.png"
                  alt=""
                  width="300"
                  heigth="150"
                ></img>
              </Link>
              <h3 className="text-gray-400">Project Tasks</h3>
            </div>

            <div>
              <Link to={`/project/${projectId}/chat`}>
                <img
                  src="/images/chat_image.png"
                  alt=""
                  width="300"
                  heigth="150"
                ></img>
              </Link>
              <h3 className="text-gray-400">Chat</h3>
            </div>

            <div>
              <Link to={`/project/${projectId}/monthCalendar`}>
                <img
                  src="/images/calendar_image.png"
                  alt=""
                  width="300"
                  heigth="150"
                ></img>
              </Link>
              <h3 className="text-gray-400">Project Calendar</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
