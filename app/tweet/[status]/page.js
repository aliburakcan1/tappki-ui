// app/tweet/[status]/page.js

'use client';
import React, { useState, useEffect } from 'react';    
import axios from 'axios';    
import OneVideo from '../../../components/OneVideo';
//import { v4 as uuidv4 } from 'uuid'; // import uuidv4 from uuid package 
import { useContext } from 'react';  
import { SessionContext } from '../../../app/SessionContext';

// example response : { params: { status: '1700125682431336773' }, searchParams: {} }
const SingleVideoPage = ({ params }) => {
  //const [video, setVideo] = useState([]);    
  //const [sessionId, setSessionId] = useState(uuidv4()); // generate UUID and store in state    
  const { sessionId } = useContext(SessionContext);
  
    

  return (    
    <div> 
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">    
        <div className="mx-auto w-full max-w-2xl flex justify-between items-center">      

              <OneVideo
                tweetId={params.status}
                sessionId={sessionId}
              />
        </div>    
      </div>    
    </div>  
  );    
};    
    
export default SingleVideoPage;    
