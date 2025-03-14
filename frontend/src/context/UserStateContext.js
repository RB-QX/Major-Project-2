// src/context/UserStateContext.js
import React, { createContext, useState } from 'react';

export const UserStateContext = createContext();

export const UserStateProvider = ({ children }) => {
  // This state might hold information such as current cognitive load and any UI adaptation messages.
  const [userState, setUserState] = useState({
    cognitiveLoad: 'Normal',  // e.g., "Normal" or "High"
    adaptationMessage: '',
  });

  return (
    <UserStateContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserStateContext.Provider>
  );
};
