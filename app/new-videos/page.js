// app/new-videos/page.js

'use client';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import VideoList from '../../components/VideoList';
import { SessionContext } from '../SessionContext';
import { useRouter } from 'next/navigation'


const NewVideosPage = () => {
  const { sessionId } = useContext(SessionContext); // get sessionId from context
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);
  const videosPerPage = 6; // Change this to your desired number of videos per page

  useEffect(() => {
    const fetchVideos = async () => {
      const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
      const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;
      const url = `${http}://${host}/api/new_videos`;
      const response = await axios.post(url, { page: currentPage, limit: videosPerPage });
      setVideos(response.data.videos);  
      setTotalVideos(response.data.total);  
    };

    fetchVideos();
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemClick = (video) => {
    //console.log("video " + video);
    router.push("/"+"?query="+video);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">  
      <div className="container mx-auto px-4">  
        <img  
            src="tepki_logo.png"  
            alt="Logo"  
            className="mx-auto mb-4 h-32 invisible"
          /> 
      <VideoList 
      videos={videos}
        sessionId={sessionId} // Pass sessionId to VideoList component
        onItemClicked={handleItemClick}
    />
      <Pagination
        totalVideos={totalVideos}
        videosPerPage={videosPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
        </div>
    </div>
  );
};

export default NewVideosPage;