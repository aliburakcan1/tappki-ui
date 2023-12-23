// app/SessionContext.js

"use client"; 
import React, { useState, useEffect } from 'react';  
import { v4 as uuidv4 } from 'uuid'; 

export const SessionContext = React.createContext();  
  
export const SessionProvider = ({ children }) => {  
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (  
    <SessionContext.Provider value={{ sessionId }}>  
      {children}  
    </SessionContext.Provider>  
  );  
};  