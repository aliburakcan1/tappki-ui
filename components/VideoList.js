// components/VideoList.js

import React, { useEffect } from 'react';  
import axios from 'axios';  
  
const VideoList = ({ videos }) => {  
  useEffect(() => {  
    if (window.twttr) {  
      window.twttr.widgets.load();  
    }  
  }, [videos]);  
  
  const handleDownload = async (videoId) => { 
    // Get download link from backend
    const port = process.env.NEXT_PUBLIC_BACKEND_PORT;  
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;  
    const url = `${http}://${host}:${port}/api/get_download_link`; 
    // convert videoId to string
    const response = await axios.get(url, {  
      params: { videoId },  
    }); 
    
    // Open download link in new tab
    window.open(response.data, '_blank');

  };  
  
  return (  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">  
      {videos.map((video) => (  
        <div key={video.tweet_id} className="bg-white rounded shadow p-4 relative flex flex-col">  
          <div className="w-full overflow-y-scroll flex-grow" style={{ maxHeight: '400px' }}>  
            <blockquote className="twitter-tweet">  
              <a href={video.url}></a>  
            </blockquote>  
          </div>  
          <h3 className="text-lg font-semibold mt-4 mb-2">{video.title}</h3>  
          <div className="flex justify-between items-center">  
            <div className="flex-grow"></div>  
            <button  
              className="bg-blue-500 text-white px-4 py-2 rounded"  
              
              onClick={() => handleDownload(video.tweet_id)}  
            >  
              Download  
            </button>  
          </div>  
        </div>  
      ))}  
    </div>  
  );  
};  
  
export default VideoList;  
