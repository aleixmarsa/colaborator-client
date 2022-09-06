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
import { SocketContext } from "../../../context/socket.context";
import { MessageAlertContext } from "../../../context/messageAlert.context";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const[messageAlert, setMessageAlert] = useContext(MessageAlertContext)
  const [users, setUsers] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showChat, setShowChat] = useState("");
  const [chatReceiver, setChatReceiver] = useState("");
  const [isProjectChat, setIsProjectChat] = useState(false);
  const [chatActive, setChatActive] = useState(null);
  // const [messageAlerts, setMessageAlerts] = useState([]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const receiveAlertListener = (alertMessage) => {
    if (alertMessage.isProjectChat) {
      if (!messageAlert.includes(alertMessage.fullMessage.room)) {
        setMessageAlert(messageAlert.concat(alertMessage.fullMessage.room));
      }
      return;
    }
    if (!messageAlert.includes(alertMessage.fullMessage.sender._id)) {
      setMessageAlert(
        messageAlert.concat(alertMessage.fullMessage.sender._id)
      );
    }
  };

  useEffect(() => {
    getUsers();
    getProjects();
    socket.emit("joinAllProjectsRoom");
  }, []);

  useEffect(() => {
    socket.on("receive_alert_message", receiveAlertListener);
  });

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
    console.log(
      "🚀 ~ file: Chat.js ~ line 66 ~ directChathandleClick ~ userChat",
      userChat
    );
    e.preventDefault();
    try {
      const response = await startDirectChatService(userChat._id);
      setShowChat(response.data._id);
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
    <div className="drop-shadow-md w-full m-3">
      <div className=" flex flex-col xl:p-3 lg:p-3 h-full bg-white drop-shadow-2xl border">
        <div className="relative grid grid-cols-5 grid-rows-1 h-full">
          <div
            className={classNames(
              showChat ? "hidden  xl:block lg:block" : "",
              "h-full col-span-5 xl:col-span-1 lg:col-span-1 mr-2"
            )}
          >
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
                        : "border",
                      "flex justify-start gap-2 bg-white mt-3 mr-3 cursor-pointer w-full p-2  drop-shadow-lg text-mainColor"
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
                    {messageAlert.includes(project._id) ? (
                      <span className="flex h-3 w-3 absolute right-3 top-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    ) : (
                      <></>
                    )}
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
                          : "border",
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
                      {messageAlert.includes(chatUser._id) ? (
                        <span className="flex h-3 w-3 absolute right-3 top-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                      ) : (
                        <></>
                      )}
                      <hr className="mt-3" />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {showChat ? (
            <div
              className={classNames(
                showChat ? "flex col-span-5" : "",
                "xl:col-span-4 lg:col-span-4 h-full flex-col bg-white rounded-xl drop-shadow-lg divide-y border list-none"
              )}
            >
              <ChatBox
                chatId={showChat}
                room={chatActive}
                chatReceiver={chatReceiver}
                isProjectChat={isProjectChat}
                setShowChat={setShowChat}
              />
            </div>
          ) : (
            <img
              src="/images/chat_image.png"
              alt=""
              width="400"
              heigth="150"
              className="hidden lg:block xl:block absolute top-1/2 left-1/2 transform -translate-y-1/2 opacity-50"
            ></img>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
