import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  startDirectChatService,
  startProjectChatService,
} from "../../../services/chat.services";
import {
  getProjectTeamsService,
  getAllCurrentProjectsService,
} from "../../../services/project.services";
import { getAllUsersService } from "../../../services/user.services";

import Avatar from "react-avatar";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";
import ChatBox from "../../../pages/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState(null);
  const [team, setTeam] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showChat, setShowChat] = useState("");
  const [chatReceiver, setChatReceiver] = useState("");
  const [isProjectChat, setIsProjectChat] = useState(false);
  const [chatActive, setChatActive] = useState(null);
  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    getUsers();
    getProjects();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getAllUsersService();
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProjects = async () => {
    try {
      const response = await getAllCurrentProjectsService(user._id);
      setProjects(response.data);
      console.log(
        "🚀 ~ file: Chat.js ~ line 43 ~ getProjects ~ projects",
        projects
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getTeam = async () => {
    try {
      const response = await getProjectTeamsService();
      setTeam(response.data);
      console.log("TEAM: ", team);
    } catch (err) {
      console.log(err);
    }
  };

  const directChathandleClick = async (e, userChat) => {
    e.preventDefault();
    console.log(`Trying to start chat with ${userChat.name}`);
    try {
      const response = await startDirectChatService(userChat._id);
      setShowChat(response.data._id);
      setChatReceiver(userChat.name);
      setIsProjectChat(false);
      setChatActive(userChat._id);

      //   navigate(`/chat/${response.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const projectChatHandleClick = async (e, projectChat) => {
    e.preventDefault();
    console.log(`Trying to start chat with ${projectChat.title}`);
    try {
      const response = await startProjectChatService(projectChat._id);
      setShowChat(response.data._id);
      setChatReceiver(projectChat.title);
      setIsProjectChat(true);
      setChatActive(projectChat._id);
      //   navigate(`/chat/${response.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (!users) {
    return <h3>...Loading</h3>;
  }

  console.log(showChat);
  return (
    <div className="drop-shadow-md h-5/6 w-full m-5 mt-3">
      <div className=" flex flex-col p-6 pt-4 h-full bg-white drop-shadow-2xl border border-black">
        <div className="grid grid-cols-5 grid-rows-1 h-full">
          <div className="h-full col-span-2 xl:col-span-1 lg:col-span-1 mr-2">
            <h2 className=" flex justify-center text-2xl flex-1 border-b-2 pb-2">
              CHATS
            </h2>
            <div>
              <h1 className=" text-left mt-2">PROJECTS</h1>

              {projects.map((project) => {
                return (
                  <div
                    key={project._id}
                    className={classNames(
                      chatActive === project._id
                        ? "outline outline-buttonHover"
                        : "",
                      "flex justify-start gap-2 hover:bg-gray-300 bg-white mt-3 mr-3 cursor-pointer w-sm p-2 border-mainColor drop-shadow-xl text-mainColor"
                    )}
                    onClick={(e) => projectChatHandleClick(e, project)}
                  >
                    <Avatar
                      round
                      size="25"
                      textSizeRatio={1.9}
                      name={project.title}
                    />
                    <p className="text-left truncate">{project.title}</p>
                    <hr className="mt-3" />
                  </div>
                );
              })}
            </div>
            <div>
              <h1 className="text-left mt-3">COWORKERS</h1>
              {users.map((chatUser) => {
                if (chatUser._id !== user._id) {
                  return (
                    <div
                      key={chatUser._id}
                      className={classNames(
                        chatActive === chatUser._id
                        ? "outline outline-buttonHover"
                        : "",
                      "flex justify-start gap-2 hover:bg-gray-300 bg-white mt-3 mr-3 cursor-pointer w-sm p-2 border-mainColor drop-shadow-xl text-mainColor"
                    )}
                      onClick={(e) => directChathandleClick(e, chatUser)}
                    >
                      <Avatar
                        round
                        size="25"
                        //   color="gray"
                        textSizeRatio={1.9}
                        name={chatUser.name}
                      />
                      <p>{chatUser.name}</p>
                      <hr className="mt-3" />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="col-span-3 xl:col-span-4 lg:col-span-4 flex h-full flex-col bg-white rounded  shadow-xl divide-y border list-none ml-2">
            {showChat && (
              <ChatBox
                chatId={showChat}
                chatReceiver={chatReceiver}
                isProjectChat={isProjectChat}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
