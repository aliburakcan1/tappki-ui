// app/SessionContext.js

"use client";
import React from 'react';  
import { v4 as uuidv4 } from 'uuid'; // import uuidv4 from uuid package 

  
export const SessionContext = React.createContext();  
  
export const SessionProvider = ({ children }) => {  
  const sessionId = uuidv4(); // generate UUID here  
  
  return (  
    <SessionContext.Provider value={{ sessionId }}>  
      {children}  
    </SessionContext.Provider>  
  );  
};  
