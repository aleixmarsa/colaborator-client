import io from "socket.io-client";
import React, { useState} from "react";

const API_URL = process.env.REACT_APP_API_URL;

// export const socket = io.connect(API_URL, {
//   extraHeaders: { Authorization: `Bearer ${storedToken}` },
// });

export const SocketContext = React.createContext();

export const SocketProviderWrapper = (props) => {
  const [socket, setSocket] = useState(null);

  const socketConnection = () => {
    const storedToken = localStorage.getItem('authToken');
    setSocket(
      io.connect(API_URL, {
        extraHeaders: { Authorization: `Bearer ${storedToken}` },
      })
    );
  };
  return (
    <SocketContext.Provider value={{socketConnection, socket, setSocket}}>
      {props.children}
    </SocketContext.Provider>
  );
};
