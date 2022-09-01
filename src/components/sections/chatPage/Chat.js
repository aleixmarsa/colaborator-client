import { useEffect, useState } from "react";
import {
  startDirectChatService,
  startProjectChatService,
} from "../../../services/chat.services";
import { getAllCurrentProjectsService } from "../../../services/project.services";
import { getAllUsersService } from "../../../services/user.services";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import Avatar from "react-avatar";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";
import ChatBox from "../../../pages/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showChat, setShowChat] = useState("");
  const [chatReceiver, setChatReceiver] = useState("");
  const [isProjectChat, setIsProjectChat] = useState(false);
  const [chatActive, setChatActive] = useState(null);

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
    } catch (err) {
      console.log(err);
    }
  };

  const directChathandleClick = async (e, userChat) => {
    e.preventDefault();
    try {
      const response = await startDirectChatService(userChat._id);
      setShowChat(response.data._id);
      console.log(
        "🚀 ~ file: Chat.js ~ line 60 ~ directChathandleClick ~ response.data",
        showChat
      );
      setChatReceiver(userChat.name);
      setIsProjectChat(false);
      setChatActive(userChat._id);
    } catch (err) {
      console.log(err);
    }
  };

  const projectChatHandleClick = async (e, projectChat) => {
    e.preventDefault();

    try {
      const response = await startProjectChatService(projectChat._id);
      setShowChat(response.data._id);
      setChatReceiver(projectChat.title);
      setIsProjectChat(true);
      setChatActive(projectChat._id);
    } catch (err) {
      console.log(err);
    }
  };

  if (!users) {
    return <LoadingSpinner />;
  }

  return (
    <div className="drop-shadow-md h-5/6 w-full m-4 mt-3">
      <div className=" flex flex-col p-6 pt-4 h-full bg-white drop-shadow-2xl border border-black">
        <div className="grid grid-cols-5 grid-rows-1 h-full">
          <div className={classNames(showChat ? "hidden  xl:grid lg:grid":"", "h-full col-span-5 xl:col-span-1 lg:col-span-1 mr-2")}>
            <h2 className=" flex justify-center text-2xl flex-1 border-b-2 pb-2">
              CHATS
            </h2>
            <div className="w-full">
              <h1 className=" text-left mt-2">PROJECTS</h1>

              {projects.map((project) => {
                return (
                  <div
                    key={project._id}
                    className={classNames(
                      chatActive === project._id
                        ? "outline outline-buttonHover"
                        : "",
                      "flex justify-start gap-2 bg-white mt-3 mr-3 cursor-pointer w-full p-2 border-mainColor drop-shadow-lg text-mainColor"
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
                        "flex justify-start gap-2 hover:bg-gray-300 bg-white mt-3 mr-3 cursor-pointer w-full p-2 border-mainColor drop-shadow-lg text-mainColor"
                      )}
                      onClick={(e) => directChathandleClick(e, chatUser)}
                    >
                      <Avatar
                        round
                        size="25"
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
          {showChat && (
            <div
              className={classNames(
                showChat ? "flex col-span-5" : "",
                "xl:col-span-4 lg:col-span-4  h-full flex-col bg-white rounded  drop-shadow-lg divide-y border list-none ml-2"
              )}
            >
              <ChatBox
                chatId={showChat}
                room={chatActive}
                chatReceiver={chatReceiver}
                isProjectChat={isProjectChat}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
