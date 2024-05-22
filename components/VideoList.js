// components/VideoList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import VideoModal from './VideoModal';
import { Tooltip } from 'react-tooltip';

const VideoList = ({ videos, sessionId, onItemClicked }) => {
  //const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoDetails, setVideoDetails] = useState({});
  const [refreshKeys, setRefreshKeys] = useState({}); // new state for refresh keys  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [copied, setCopied] = useState(false);
  const [clickedVideoIds, setClickedVideoIds] = useState(new Set());



  const handleShare = (videoId) => {
    const fullUrl = `${window.location.origin}/reaction/${videoId}`;
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset after 1 second
      });
    } else {
      window.open(`/reaction/${videoId}`, '_blank');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, [videos, refreshKeys]);
  

  const handleDownload = async (videoId) => {
    if (!clickedVideoIds.has(videoId)) {
      window.open('//aickeebsi.com/4/7518089', '_blank');
      setClickedVideoIds(prevState => new Set(prevState).add(videoId));
    } else {
      // Get download link from backend
      const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
      const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;
      const url = `${http}://${host}/api/get_download_link`;
      // convert videoId to string
      const response = await axios.post(url,
        {video_id: videoId},
        {headers: { 'X-Session-ID': sessionId }}, // add header to request
      );
  
      // Open download link in new tab
      window.open(response.data, '_blank');
    }
  };

  //const handleVideoClick = (video) => {
  //  setSelectedVideo(video);
  //};
  //const handleCloseModal = () => {
  //  setSelectedVideo(null);
  //};

  const handleVideoDetails = async (videoId) => {
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;
    const url = `${http}://${host}/api/get_video_details`;
    const response = await axios.post(url, {tweet_id: videoId}, {headers: { 'X-Session-ID': sessionId }});
    //console.log(response.data);
    setVideoDetails(response.data); // store the video details in the state
  };

    // add a new function to handle refresh  
  const handleRefresh = (videoId) => {  
    setRefreshKeys(oldKeys => ({ ...oldKeys, [videoId]: (oldKeys[videoId] || 0) + 1 })); // increment the refreshKey state to trigger re-render  
  }; 

  return (  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">  
      {videos.map((video, index) => (  
        <div key={`${video.tweet_id}-${refreshKeys[video.tweet_id] || 0}`} className="bg-white rounded shadow p-4 relative flex flex-col">      
          <div className="w-full overflow-y-scroll flex-grow" style={{ maxHeight: '400px' }}>  
            <blockquote className="twitter-tweet" data-media-max-width="560">  
              <a href={video.url}></a>  
            </blockquote>  
          </div>  
          <button className="text-lg font-semibold mt-4 mb-2" onClick={() => window.open("/reaction/"+video.tweet_id, '_blank')}>
            {video.title}  
          </button>  
          <div className="flex justify-between items-center">  
            <div data-tooltip-id={`video-details-${index}`}>  
              <button   
                className="text-white px-4 py-2 rounded border border-green-500 hover:bg-green-300"   
                onClick={() => handleVideoDetails(video.tweet_id)}  
                title="Detaylar için tıkla"
              >  
                ℹ️    
              </button>  
            </div>  
            <Tooltip id={`video-details-${index}`} openOnClick="true" closeEvents={["mouseleave"]} clickable="true">  
              <div>  
                <ul>  
                  {videoDetails.people || videoDetails.music || videoDetails.animal || videoDetails.program ? (
                    <>
                      {videoDetails.people && videoDetails.people.map((person, i) => (
                      <li key={i}>👥: <button className="text-white hover:text-blue-500 hover:underline" onClick={() => onItemClicked(person)}>{person}</button></li>
                      ))}
                      {videoDetails.music && <li>🎶: <button className="text-white hover:text-blue-500 hover:underline" onClick={() => onItemClicked(videoDetails.music)}>{videoDetails.music}</button></li>}
                      {videoDetails.animal && <li>🧸: <button className="text-white hover:text-blue-500 hover:underline" onClick={() => onItemClicked(videoDetails.animal)}>{videoDetails.animal}</button></li>}
                      {videoDetails.program && <li>📺: <button className="text-white hover:text-blue-500 hover:underline" onClick={() => onItemClicked(videoDetails.program)}>{videoDetails.program}</button></li>}
                                  
                    </>
                  ) : (
                    <li>Bulunamadı</li>
                  )}
                </ul>  
              </div>  
            </Tooltip>
            <div className="flex justify-center items-center" data-tooltip-id='refresh-button'>
              <button onClick={() => handleRefresh(video.tweet_id)} className={`text-black px-4 py-2 rounded border border-green-500 hover:bg-green-300`}>🔄</button>
            </div>  
            {!isMobile && <Tooltip id='refresh-button'>
              <div>  
                <p>  
                  Yüklenmediyse yenile.  
                </p>  
              </div>
            </Tooltip>}
            <div className="flex justify-center items-center" data-tooltip-id='share-button'>
              <button onClick={() => handleShare(video.tweet_id)} className={`text-black px-4 py-2 rounded border border-green-500 hover:bg-green-300`}>  
                🔗
              </button> 
            </div>  
            {!isMobile && <Tooltip id='share-button'>
              <div>  
                <p>  
                  {copied ? 'Link Kopyalandı!' : 'Paylaş'}
                </p>  
              </div>
            </Tooltip>}
            <button className="text-black px-4 py-2 rounded border border-green-500 hover:bg-green-300" onClick={() => handleDownload(video.tweet_id)}>  
              ⬇️ İndir  
            </button>   
          </div> 
        </div>  
      ))}  
      {/* {selectedVideo && <VideoModal video={selectedVideo} onClose={handleCloseModal} />} */}
    </div>  
  );
  
};

export default VideoList;