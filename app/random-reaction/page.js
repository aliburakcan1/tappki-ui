// app/popular_videos/page.js
'use client';
import React, { useState, useEffect } from 'react';    
import axios from 'axios';    
import OneVideo from '../../components/OneVideo';   
//import { v4 as uuidv4 } from 'uuid'; // import uuidv4 from uuid package 
import { useContext } from 'react';  
import { SessionContext } from '../SessionContext';

    
const RandomReaction = () => {    
  const [video, setVideo] = useState([]);    
  //const [sessionId, setSessionId] = useState(uuidv4()); // generate UUID and store in state    
  const { sessionId } = useContext(SessionContext);
    
  const GetVideo = async () => {    
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;    
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;    
    const url = `${http}://${host}/api/get_random_reaction`;  
    const response = await axios.get(url, {      
      headers: { 'X-Session-ID': sessionId }, // add header to request   
    });    
    setVideo(response.data);  
  };    

  useEffect(() => {
    GetVideo();

    // Add the ad script
    //const s = document.createElement('script');
    //s.src = 'https://gloaphoo.net/401/7517899';
    //try {
    //  (document.body || document.documentElement).appendChild(s);
    //} catch(e) {
    //  console.error(e);
    //}
  }, []); // Run GetVideo on mount

  return (    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">    
      <div className="mx-auto w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center">      
        <OneVideo
          tweetId={video}
          sessionId={sessionId}
        />
        <button className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4 sm:mt-0 sm:ml-4" onClick={GetVideo}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7" />
          </svg>
        </button>
      </div>    
    </div>  
  );      
};    
    
export default RandomReaction;    
