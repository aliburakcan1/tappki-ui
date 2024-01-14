// app/popular-videos/page.js

'use client';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';  
import VideoList from '../../components/VideoList';  
import { SessionContext } from '../SessionContext';  
import { useContext } from 'react';
import { useRouter } from 'next/navigation'

const PopularVideos = () => {  
  const [videos, setVideos] = useState([]);  
  const [rangeFilter, setRangeFilter] = useState('daily'); // Add filter state variable
  const { sessionId } = useContext(SessionContext); // get sessionId from context
  const router = useRouter();
  
  const searchPopularVideos = async (rangeFilter) => {  
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;  
    const data = { range_filter: rangeFilter };
    const url = `${http}://${host}/api/get_popular_videos`;
    axios.post(url, data, {headers: { 'X-Session-ID': sessionId }}).then((response) => {
      setVideos(response.data.videos);  
    });
  };  

  const handleItemClick = (video) => {
    //console.log("video " + video);
    router.push("/"+"?query="+video);
  };
  
  

  useEffect(() => {
    searchPopularVideos(rangeFilter);
  }, [rangeFilter]);

  return (  
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">  
      <div className="container mx-auto px-4">  
        <img  
            src="tepki_logo.png"  
            alt="Tepki"  
            className="mx-auto mb-4 h-32 invisible"
          /> 
        <div className="flex justify-center my-4 sticky top-1 z-10">
          <button className={`mx-2 ${rangeFilter === 'daily' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded-lg px-4 py-2`} onClick={() => setRangeFilter('daily')}>Bugün</button>
          <button className={`mx-2 ${rangeFilter === 'weekly' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded-lg px-4 py-2`} onClick={() => setRangeFilter('weekly')}>Bu hafta</button>
          <button className={`mx-2 ${rangeFilter === 'monthly' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded-lg px-4 py-2`} onClick={() => setRangeFilter('monthly')}>Bu ay</button>
        </div>
        <VideoList  
            videos={videos}  
            sessionId={sessionId} // Pass sessionId to VideoList component
            key={JSON.stringify(videos)} // Add key prop to force a re-render  
            onItemClicked={handleItemClick}
        />  
      </div>  
    </div>  
  );  
};  

export default PopularVideos;  