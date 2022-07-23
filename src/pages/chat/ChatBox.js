import { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import { getAllMessagesService } from "../../services/chat.services";
import { AuthContext } from "../../context/auth.context";

import io from "socket.io-client";
let socket;

const ChatBox = (props) => {
  const [allMessages, setAllMessages] = useState([]);
  const [text, setText] = useState("");
  const { chatId, chatReceiver } = props;
  const { user } = useContext(AuthContext);
  // const { chatId } = useParams();

  useEffect(() => {
    console.log(
      "🚀 ~ file: chat.js ~ line 14 ~ useEffect ~ useEffect",
      useEffect
    );
    getAllMessages();
    socketConnection();
  }, []);

  const socketConnection = () => {
    const storedToken = localStorage.getItem("authToken");
    socket = io.connect("http://localhost:5005", {
      extraHeaders: { Authorization: `Bearer ${storedToken}` },
    });

    socket.emit("join_chat", chatId);
    console.log("Joinning chat: ", chatId);

    socket.on("receive_message", (newMessage) => {
      console.log("Missatge rebut");
      setAllMessages((previousState) => {
        console.log(
          "🚀 ~ file: chat.js ~ line 27 ~ setAllMessages ~ previousState",
          previousState
        );
        const newState = [...previousState, newMessage];
        return newState;
      });
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
    setText(e.target.value);
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
      <h2 className="flex-1 text-lg ">Chatting with: {chatReceiver}</h2>

      <div className=" flex flex-col justify-between h-full">
        <div className=" space-y-10 grid grid-cols-1">
          {allMessages.map((message) => {
            return (
              <div
                className={`mx-5 ${
                  isMessageFromUser(message)
                    ? "place-self-end"
                    : "place-self-start"
                }`}
                key={message._id}
              >
                <p
                  className={` p-5 rounded-2xl ${
                    isMessageFromUser(message)
                      ? "bg-lime-200 rounded-tr-none"
                      : "bg-gray-200 rounded-tl-none"
                  }`}
                >
                  {message.sender.name}: {message.text}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mb-2 flex mx-2">
          <input
            className="bg-gray-200 border border-black mr-1 w-full"
            type="text"
            placeholder=" Type a message..."
            name="text"
            value={text}
            onChange={handleChange}
          />
          <button
            className="bg-gray-200 border border-black w-14 h-8"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
