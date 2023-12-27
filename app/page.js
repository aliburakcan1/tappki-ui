// app/page.js

'use client';
import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';  
import SearchBar from '../components/SearchBar';  
import VideoList from '../components/VideoList';  
import Pagination from '../components/Pagination'; 
import InfiniteBar from '../components/InfiniteBar';
//import { v4 as uuidv4 } from 'uuid'; // import uuidv4 from uuid package
import { SessionContext } from './SessionContext';  
import { useSearchParams } from 'next/navigation';  


  
const Home = () => {  
  const [videos, setVideos] = useState([]);  
  const [searchActive, setSearchActive] = useState(false);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalVideos, setTotalVideos] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Tepki'); // Add filter state variable
  const [marqueeItems, setMarqueeItems] = useState([]);
  //const [sessionId, setSessionId] = useState(uuidv4()); // generate UUID and store in state  
  const { sessionId } = useContext(SessionContext); // get sessionId from context
  const videosPerPage = 6;  

  const searchParams = useSearchParams();  
  const search = searchParams.get('search');  

  useEffect(() => {
    const fetchData = async () => {
      const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
      const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;  
      const url = `${http}://${host}/api/suggestions`;
      const response = await axios.post(url, null, {  
        headers: { 'X-Session-ID': sessionId }, // add header to request 
      });
      setMarqueeItems(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {  
    if (search) {  
      searchVideos(search);  
    }  
  }, [search]);  
  
  const searchVideos = async (searchTerm, page = 1) => {  
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;  
    const url = `${http}://${host}/api/videos`;
    const response = await axios.post(url, 
      { query: searchTerm, page: page, limit: videosPerPage }, 
      {headers: { 'X-Session-ID': sessionId }}, // add header to request 
    );  
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
            src="tepki_logo.png"  
            alt="Logo"  
            className={`mx-auto mb-4 h-32 ${ searchActive ? ( "invisible" ) : ( "visible" )} `}
          />  
        </div>  
        <div className={`w-full ${searchActive ? "mb-8" : "mt-16"} sticky top-1 z-10`}>  
          <SearchBar onSubmit={searchVideos} filter={filter}/>  
        </div>
        <InfiniteBar marqueeItems={marqueeItems} onItemClicked={searchVideos} />
        
        {videos.length > 0 && (  
          <VideoList  
            videos={videos}  
            sessionId={sessionId} // Pass sessionId to VideoList component
            key={JSON.stringify(videos)} // Add key prop to force a re-render  
            onItemClicked={searchVideos} // Make sure searchVideos is a function
            />  
        )}  
        {searchActive && videos.length === 0 && (  
          <div className="text-center mt-16">  
            <p className="text-2xl">  
              No videos found for <strong>{searchTerm}</strong>  
            </p>  
          </div>  
        )
        }
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
