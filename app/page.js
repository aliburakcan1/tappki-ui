// app/page.js
'use client';
import React, { useState } from 'react';  
import axios from 'axios';  
import SearchBar from '../components/SearchBar';  
import VideoList from '../components/VideoList'; 
  
const Home = () => {  
  const [videos, setVideos] = useState([]);  
  const [searchActive, setSearchActive] = useState(false);  
  
  const searchVideos = async (searchTerm) => {  
    const response = await axios.get('http://localhost:8000/api/videos', {  
      params: { query: searchTerm },  
    });  
  
    setVideos(response.data);  
    setSearchActive(true);   
  };  
  
  return (  
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">  
      <div className="container mx-auto px-4">  
        <div className="text-center mb-8">  
        <img  
            src="tappki_logo1.png"  
            alt="Logo"  
            className="mx-auto mb-4 h-32"  
          />
        </div>  
        <div className={`w-full ${searchActive ? "mb-8" : "mt-16"}`}>  
          <SearchBar onSubmit={searchVideos} />  
        </div>  
        {videos.length > 0 && <VideoList videos={videos} />}  
      </div>  
    </div>  
  );   
};  
  
export default Home;  
