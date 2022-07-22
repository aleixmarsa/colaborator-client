import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllMessagesService } from "../../services/chat.services";

import io from "socket.io-client";
let socket;

const Chat = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [text, setText] = useState("");
  const { chatId } = useParams();

  useEffect(() => {
  console.log("🚀 ~ file: chat.js ~ line 14 ~ useEffect ~ useEffect", useEffect)
    getAllMessages();
    socketConnection();
  }, []);

  const socketConnection = () => {
    const storedToken = localStorage.getItem("authToken");
    socket = io.connect("http://localhost:5005", {
      extraHeaders: { Authorization: `Bearer ${storedToken}` },
    });

    socket.emit("join_chat", chatId);
    console.log("Joinning chat: ", chatId)

    socket.on("receive_message", (newMessage) => {
      console.log("Missatge rebut")
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

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {allMessages.map((message) => {
          return (
            <div key={message._id}>
              <p>
                {message.sender.name}: {message.text}
              </p>
            </div>
          );
        })}
      </div>
      <input
        className="bg-gray-200 border border-black mt-3 mr-2"
        type="text"
        placeholder="Message..."
        name="text"
        value={text}
        onChange={handleChange}
      />
      <button
        className="bg-gray-200 border border-black w-20"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
