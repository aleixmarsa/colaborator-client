import { useParams } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Chat from "../components/sections/chatPage/Chat";
import LateralBar from "../components/sections/LateralBar";

const ChatPageWBar = () => {
  const { projectId } = useParams();

  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex flex-row h-full w-full">
      <LateralBar 
        projectId={projectId}
      />
        <Chat />
      </div>
    </div>
  );
};

export default ChatPageWBar;