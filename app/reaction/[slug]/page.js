// app/reaction/[slug]/page.js
'use client';
import React from 'react';    
import OneReaction from '../../../components/OneReaction';   
import { useContext } from 'react';  
import { SessionContext } from '../../SessionContext';

const Reaction = ({ params }) => {   
  const videoId = params.slug;   
  const { sessionId } = useContext(SessionContext);
  
  return (    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">  
        <div className="w-full max-w-md"> {/* This div will control the size of the video */}       
        <OneReaction
          videoId={videoId}
          sessionId={sessionId}
        />
        </div>
    </div>  
  );      
};    
    
export default Reaction;    