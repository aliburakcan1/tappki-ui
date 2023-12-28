// app/reaction/[slug]/page.js
'use client';
import React from 'react';    
import OneVideo from '../../../components/OneVideo';   
import { useContext } from 'react';  
import { SessionContext } from '../../SessionContext';

    
const Reaction = ({ params }) => {   
  const video = params.slug;   
  const { sessionId } = useContext(SessionContext);
  
  return (    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">    
      <div className="mx-auto w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center">      
        <OneVideo
          tweetId={video}
          sessionId={sessionId}
        />
      </div>    
    </div>  
  );      
};    
    
export default Reaction;    
