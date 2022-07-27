import io from "socket.io-client";
import React from 'react';
import { Outlet } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");

export const socket = io.connect("http://localhost:5005", {
    extraHeaders: { Authorization: `Bearer ${storedToken}` },
  });

export const SocketContext = React.createContext();

export const SocketContextLayout = () => {
    return(
        <SocketContext.Provider value = {socket}>
        <Outlet/>
        </SocketContext.Provider>
    )
}