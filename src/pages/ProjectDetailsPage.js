import { useState, useEffect } from "react";
import { getProjectDetailsService } from "../services/project.services";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Avatar from "react-avatar";
import { ChatIcon, CalendarIcon, PencilAltIcon } from "@heroicons/react/solid";

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
    <div className="h-screen">
      <NavBar />
      <div className="drop-shadow-md my-12 mx-5 inline-block align-middle mx-auto xl:border-gray-200 lg:min-w-0 lg:flex-1 xl:w-3/6 gap-6 xl:my-32 ">
        <div className=" flex flex-col gap-6 items-center p-6 pt-2 bg-stone-50">
          <h1 className=" font-normal text-2xl underline underline-offset-2">
            {title}
          </h1>
          <p className=" font-light text-justify max-w-2xl">{description}</p>
          <div className="flex gap-10">
            
            {team.map((member) => {
              return (
                <div>
                  <Avatar
                    round
                    size="30"
                    // color="gray"
                    textSizeRatio={1.75}
                    name={member.name}
                  />
                  <span className="ml-2">{member.name}</span>
                </div>
              );
            })}
          </div>
          <div className="flex w-full justify-evenly">
          <Link to={`/${projectId}/tasks`}>
            <PencilAltIcon
              className="text-green-700 hover:text-green-600 h-32 w-32"
              aria-hidden="true"
            />
            </Link>
            <CalendarIcon
              className="text-green-700 hover:text-green-600 h-32 w-32"
              aria-hidden="true"
            />
            <Link to="/chat">
            <ChatIcon
              className="text-green-700 hover:text-green-600 h-32 w-32"
              aria-hidden="true"
            />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectDetailsPage;
