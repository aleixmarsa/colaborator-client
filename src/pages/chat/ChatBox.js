import { useEffect, useState, useContext } from "react";

import { getAllMessagesService } from "../../services/chat.services";
import { AuthContext } from "../../context/auth.context";
import {
  ChevronDoubleRightIcon,
  ArrowSmLeftIcon,
} from "@heroicons/react/outline";
import Avatar from "react-avatar";
import { SocketContext } from "../../context/socket.context";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { MessageAlertContext } from "../../context/messageAlert.context";

const ChatBox = (props) => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const[messageAlert, setMessageAlert] = useContext(MessageAlertContext)

  const [allMessages, setAllMessages] = useState([]);
  const [text, setText] = useState("");
  const { chatId, room, chatReceiver, isProjectChat, setShowChat } = props;
  const [loading, setLoading] = useState(true);

  const receiveMessageListener = (newMessage) => {
    console.log("🚀 ~ file: ChatBox.js ~ line 23 ~ receiveMessageListener ~ newMessage", newMessage)
    console.log("Message received, chat: ", chatId);
    if (newMessage.chatId === chatId) {
      getAllMessages();
    }
  };
  const removeMessageAlert = (() => {
    setMessageAlert(messageAlert.filter(alert => alert !== room));
  })

  useEffect(() => {
    getAllMessages();
    removeMessageAlert()
  }, [chatId]);

  // useEffect(() => {
  //   removeMessageAlert()
  // }, [messageAlert]);

  useEffect(() => {
    socket.on("receive_message", receiveMessageListener);
    return () => {
      socket.off("receive_message", receiveMessageListener);
    };
  }, [chatId]);

  const getAllMessages = async () => {
    try {
      const response = await getAllMessagesService(chatId);
      setAllMessages(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage(e);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Trying to send message: ", text, " to chat", chatId);
    const messageObj = { text, chatId, room };
    socket.emit("send_message", { messageObj, isProjectChat });
    setText("");
  };

  const isMessageFromUser = (message) => {
    return user._id === message.sender._id;
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className=" relative flex flex-col justify-between h-full bg-secondaryLowColor rounded-xl ">
      <div className="flex justify-center py-1 bg-mainColor">
        <Avatar round size="25" textSizeRatio={1.9} name={chatReceiver} className="border-solid"/>
        <h2 className="text-lg font-small ml-3 text-white">{chatReceiver}</h2>
      </div>
        
      <ArrowSmLeftIcon className=" absolute h-8 top-0.5 left-2 pr-3 cursor-pointer  text-white" onClick={() => setShowChat("")}/>
      <div className=" flex flex-col-reverse justify-between h-full overflow-auto">
        <div className=" space-y-10 grid grid-cols-1   ">
          {allMessages.map((message) => {
            return (
              <div
                key={message._id}
                className={`mx-3 ${
                  isMessageFromUser(message)
                    ? "place-self-end"
                    : "place-self-start"
                }`}
              >
                <div
                  className={`break-words py-2 px-3 rounded-2xl text-left ${
                    isMessageFromUser(message)
                      ? "bg-mainColor text-white rounded-tr-none"
                      : "bg-white rounded-tl-none"
                  }`}
                >
                  {!isMessageFromUser(message) && isProjectChat && (
                    <p className="text-sm font-bold">{message.sender.name}</p>
                  )}
                  {message.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-2 flex mx-2 border rounded-xl bg-white h-10 items-center ">
        <input
          className="mx-2 w-full focus:outline-none"
          type="text"
          placeholder=" Type a message..."
          name="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <div>
          <ChevronDoubleRightIcon
            className="text-buttonHover hover:text-gray-400 h-8 w-8 cursor-pointer mr-1"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
