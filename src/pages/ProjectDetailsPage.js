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
        <>
        <NavBar />
        <div className="flex flex-row">
        
            <LateralBar 
                projectId={projectId}
            />

            <div className="flex flex-col flex-wrap w-screen">
                <h1 className="flex font-normal text-4xl m-2 pb-4 border-b-2 b-color-gray-200">
                    {title}
                </h1>

                

                <div className="flex flex-row items-center mb-6 mt-2 ml-5">
                <h3 className="font-bold">Members: </h3>
                    {team.map((member) => {
                        return (
                        <div className="ml-4">
                            <Avatar
                            round
                            size="30"
                            textSizeRatio={1.75}
                            name={member.name}
                            />
                            <span className="ml-2">{member.name}</span>
                        </div>
                        );
                    })}
                </div>

                <h6 className=" ml-5 text-left text-gray-600 max-w-4xl">{description}</h6>

                <div className="flex flex-row justify-around mt-28">
                    <div>
                        <Link to={`/${projectId}/tasks`}>
                            <img className="mt-3" src="/images/tasks_image.jpg" alt="" width="300" heigth="150">

                            </img>
                        </Link>
                        <h3 className="text-gray-400">Project Tasks</h3>
                    </div>
                    
                    <div>
                        <Link to={`/${projectId}/chat`}>
                            <img src="/images/xat_image.jpg" alt="" width="300" heigth="150">

                            </img>
                            
                        </Link>
                        <h3 className="text-gray-400">Chat</h3>
                    </div>
                    
                    <div>
                        <Link to={`/${projectId}/monthCalendar`}>
                            <img src="/images/calendar_image.jpg" alt="" width="300" heigth="150">

                            </img>
                        
                        </Link>
                        <h3 className="text-gray-400">Project Calendar</h3>
                    </div>
                    
                </div>  
            </div>

        
        </div>
        </>
    );
};


{/* <div className="felx flex-column">

<div className=" my-12 mx-5 inline-block align-middle mx-auto lg:min-w-0 lg:flex-1 xl:w-3/6 gap-6 xl:my-32 ">
    <h1 className=" font-normal text-2xl underline underline-offset-2">
            {title}
    </h1>
    <div className=" flex flex-col gap-6 items-center p-6 pt-2 ">
        
        <div className="flex gap-10">
            
            <p className=" font-light text-justify max-w-2xl">{description}</p>
            
            
            
        </div>
        <div className="flex w-full justify-evenly">
            {/*<Link to={`/${projectId}/tasks`}>
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
            </Link>*/}
//         </div>
//     </div>
// </div>
// </div> */}

// {team.map((member) => {
//     return (
//     <div>
//         <Avatar
//         round
//         size="30"
//         // color="gray"
//         textSizeRatio={1.75}
//         name={member.name}
//         />
//         <span className="ml-2">{member.name}</span>
//     </div>
//     );
// })}

export default ProjectDetailsPage;
