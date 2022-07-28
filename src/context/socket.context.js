import io from "socket.io-client";
import React from 'react';

const storedToken = localStorage.getItem("authToken");
const API_URL = process.env.REACT_APP_API_URL;

export const socket = io.connect(API_URL, {
    extraHeaders: { Authorization: `Bearer ${storedToken}` },
  });

export const SocketContext = React.createContext();

export const SocketProviderWrapper = (props) => {
    return(
        <SocketContext.Provider value = {socket}>
        {props.children}
        </SocketContext.Provider>
    )
}