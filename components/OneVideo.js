// components/OneVideo.js

import React, { useEffect } from 'react';  
import axios from 'axios';  
  
const OneVideo = ({ tweetId, sessionId }) => {  
  console.log("OneVideo");
  console.log(tweetId);
  
  useEffect(() => {  
    if (window.twttr) {  
      window.twttr.widgets.load();  
    }  
  }, [tweetId]);
  
  //const handleDownload = async (tweetId) => { 
  //  // Get download link from backend
  //  const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
  //  const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;
  //  const url = `${http}://${host}/api/get_download_link`; 
  //  // convert tweetId to string
  //  const response = await axios.get(url, {  
  //    params: { tweetId },  
  //    headers: { 'X-Session-ID': sessionId }, // add header to request
  //  }); 
  //  
  //  // Open download link in new tab
  //  window.open(response.data, '_blank');
//
  //};  
  
  
  return (   
    <div key={tweetId} className='w-full'>
        <blockquote className="twitter-tweet">
          <a href={`https://twitter.com/i/status/${tweetId}`}></a>  
        </blockquote>  
    </div>
  );
};  
  
export default OneVideo;

