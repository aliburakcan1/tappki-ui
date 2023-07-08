// app/page.js
'use client';
import React, { useState } from 'react';  
import axios from 'axios';  
import SearchBar from '../components/SearchBar';  
import VideoList from '../components/VideoList';  
import Pagination from '../components/Pagination';  
  
const Home = () => {  
  const [videos, setVideos] = useState([]);  
  const [searchActive, setSearchActive] = useState(false);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalVideos, setTotalVideos] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');    
  const videosPerPage = 12;  
  
  const searchVideos = async (searchTerm, page = 1) => {  
    const port = process.env.NEXT_PUBLIC_BACKEND_PORT;  
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;  
    const url = `${http}://${host}:${port}/api/videos`;  
    console.log(`url: ${url}`);  
    const response = await axios.get(url, {  
      params: { query: searchTerm, page, limit: videosPerPage },  
    });  
    setVideos(response.data.videos);  
    setTotalVideos(response.data.total);  
    setSearchActive(true);  
    setCurrentPage(page);  
    setSearchTerm(searchTerm); // Add this line to update the searchTerm state  
  };  
  
  const handlePageChange = (newPage, searchTerm) => {    
    searchVideos(searchTerm, newPage);    
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
        <div className={`w-full ${searchActive ? "mb-8" : "mt-16"} sticky top-1 z-50`}>  
          <SearchBar onSubmit={searchVideos} />  
        </div>  
        {videos.length > 0 && (  
          <VideoList  
            videos={videos}  
            key={JSON.stringify(videos)} // Add key prop to force a re-render  
          />  
        )}  
        {totalVideos > 0 && (  
          <Pagination    
          totalVideos={totalVideos}    
          videosPerPage={videosPerPage}    
          currentPage={currentPage}    
          onPageChange={handlePageChange}  
          searchTerm={searchTerm}  
        />           
         
        )}  
      </div>  
    </div>  
  );  
};  
  
export default Home;  
