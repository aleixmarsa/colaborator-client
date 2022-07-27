// import io from "socket.io-client";
// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";

// const storedToken = localStorage.getItem("authToken");
// console.log("🚀 ~ file: socket.context.js ~ line 6 ~ storedToken", storedToken);

// export const SocketContext = React.createContext();

// export const SocketProviderWrapper = (props) => {
  
//     const socketConnect = () => {
//     return io.connect("http://localhost:5005", {
//       extraHeaders: { Authorization: `Bearer ${storedToken}` },
//     });
//   };

//   return (
//     <SocketContext.Provider value={{ socketConnect }}>
//       {props.children}
//     </SocketContext.Provider>
//   );
// };

import io from "socket.io-client";
import React from 'react';
import { Outlet } from "react-router-dom";
import ProjectsPage from "../pages/ProjectsPage";
const storedToken = localStorage.getItem("authToken");

export const socket = io.connect("http://localhost:5005", {
    extraHeaders: { Authorization: `Bearer ${storedToken}` },
  });

export const SocketContext = React.createContext();

export const SocketProviderWrapper = (props) => {
    return(
        <SocketProviderWrapper.Provider value = {socket}>
        {props.children}
        </SocketProviderWrapper.Provider>
    )
}
