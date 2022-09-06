import React, { useState } from "react";

const initialState = [];

export const MessageAlertContext = React.createContext();

const MessageAlertWrapper = ({ children }) => {
  const [messageAlert, setMessageAlert] = useState(initialState);
  return (
    <MessageAlertContext.Provider value={[messageAlert, setMessageAlert]}>
      {children}
    </MessageAlertContext.Provider>
  );
};

export default MessageAlertWrapper;
