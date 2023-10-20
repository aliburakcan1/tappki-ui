// app/page.js

'use client';
import React, { useState } from 'react'; 
import { useContext } from 'react';  
import axios from 'axios';  
import SearchBar from '../components/SearchBar';  
import VideoList from '../components/VideoList';  
import Pagination from '../components/Pagination'; 
import FilterBar from '../components/FilterBar'; 
//import { v4 as uuidv4 } from 'uuid'; // import uuidv4 from uuid package
import { SessionContext } from './SessionContext';  

  
const Home = () => {  
  const [videos, setVideos] = useState([]);  
  const [searchActive, setSearchActive] = useState(false);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalVideos, setTotalVideos] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(''); // Add filter state variable
  //const [sessionId, setSessionId] = useState(uuidv4()); // generate UUID and store in state  
  const { sessionId } = useContext(SessionContext); // get sessionId from context
  const videosPerPage = 9;  
  
  const searchVideos = async (searchTerm, page = 1) => {  
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;  
    const url = `${http}://${host}/api/videos`;
    const response = await axios.get(url, {  
      params: { query: searchTerm, page, limit: videosPerPage }, 
      headers: { 'X-Session-ID': sessionId }, // add header to request 
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
  
  const handleFilterClick = (value) => {
    setFilter(value);
  }
    
  
  return (  
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">  
      <div className="container mx-auto px-4">  
        <div className="text-center mb-8">  
          <img  
            src="tappki_logo2.png"  
            alt="Logo"  
            className="mx-auto mb-4 h-32"  
          />  
        </div>  
        <div className={`w-full ${searchActive ? "mb-8" : "mt-16"} sticky top-1 z-50`}>  
          <SearchBar onSubmit={searchVideos} filter={filter}/>  
        </div>  
        <FilterBar onSubmit={searchVideos} onFilterClick={handleFilterClick} /> {/* Pass handleFilterClick function to FilterBar */}
        
        {videos.length > 0 && (  
          <VideoList  
            videos={videos}  
            sessionId={sessionId} // Pass sessionId to VideoList component
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
