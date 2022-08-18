import NavBar from "../components/navbar/NavBar";
import Chat from "../components/sections/chatPage/Chat";

const ChatPage = () => {

  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex flex-grow flex-row h-full w-full">
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
