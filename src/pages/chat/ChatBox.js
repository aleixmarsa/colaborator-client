import { useEffect, useState, useContext } from "react";

import { getAllMessagesService } from "../../services/chat.services";
import { AuthContext } from "../../context/auth.context";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import Avatar from "react-avatar";

import io from "socket.io-client";
let socket;

const ChatBox = (props) => {
  const [allMessages, setAllMessages] = useState([]);
  const [text, setText] = useState("");
  const { chatId, chatReceiver, isProjectChat } = props;

  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   getAllMessages();
  //   joinChat(socket);
  // }, []);

  // const joinChat = (socket) => {
  //   socket.emit("join_chat", chatId);
  // };

  useEffect(() => {
    getAllMessages();
    socketConnection();
  }, [chatId]);

  const socketConnection = () => {
    const storedToken = localStorage.getItem("authToken");
    socket = io.connect("http://localhost:5005", {
      extraHeaders: { Authorization: `Bearer ${storedToken}` },
    });
    socket.emit("join_chat", chatId);
    console.log("Joinning chat: ", chatId);

    socket.on("receive_message", (newMessage) => {
      getAllMessages();
    });
  };

  const getAllMessages = async () => {
    try {
      const response = await getAllMessagesService(chatId);
      setAllMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e);
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage(e);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Trying to send message: ", text);
    const messageObj = { text, chatId };
    socket.emit("send_message", messageObj);
    setText("");
  };

  const isMessageFromUser = (message) => {
    return user._id === message.sender._id;
  };

  return (
    <div className=" flex flex-col justify-between h-full">
      <div className="flex justify-center mt-2">
        <Avatar
          round
          size="25"
          // color="gray"
          textSizeRatio={1.9}
          name={chatReceiver}
        />
        <h2 className="text-lg font-medium ml-3 ">{chatReceiver}</h2>
      </div>

      <div className=" flex flex-col-reverse justify-between h-full overflow-auto">
        <div className=" space-y-10 grid grid-cols-1   ">
          {allMessages.map((message) => {
            return (
              <div
                key={message._id}
                className={`mx-5 ${
                  isMessageFromUser(message)
                    ? "place-self-end"
                    : "place-self-start"
                }`}
              >
                <p
                  className={` py-2 px-3 rounded-2xl text-left ${
                    isMessageFromUser(message)
                      ? "bg-green-300 rounded-tr-none"
                      : "bg-gray-200 rounded-tl-none"
                  }`}
                >
                  {!isMessageFromUser(message) && isProjectChat && (
                    <p className="text-sm font-bold">{message.sender.name}</p>
                  )}
                  {message.text}
                  {/* {message.sender.name}: {message.text} */}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-2 flex mx-2 border border-gray-200 h-10 items-center">
        <input
          className="mx-1 w-full focus:outline-none"
          type="text"
          placeholder=" Type a message..."
          name="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <div>
          <ChevronDoubleRightIcon
            className="text-gray-300 hover:text-gray-400 h-8 w-8 cursor-pointer mr-1"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
