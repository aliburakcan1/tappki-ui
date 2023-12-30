// components/OneReaction.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
import { useRouter } from 'next/navigation';  


const OneReaction = ({ videoId, sessionId }) => {
  const [videoDetails, setVideoDetails] = useState({});
  const [video, setVideo] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  const fetchVideo = async () => {
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;
    const url = `${http}://${host}/api/one_reaction`;
    const response = await axios.post(url, { "video_id": videoId }, {headers: { 'X-Session-ID': sessionId }});
    setVideo(response.data);
    setRefreshKey(oldKey => oldKey + 1);
  };

  useEffect(() => {
    fetchVideo();
  }, [videoId, sessionId]);

  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, [video]);

  const handleRefresh = () => {
    fetchVideo();
  };

  const handleDownload = async (videoId) => {
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;
    const url = `${http}://${host}/api/get_download_link`;
    const response = await axios.post(url,
      {video_id: videoId},
      {headers: { 'X-Session-ID': sessionId }},
    );
    window.open(response.data, '_blank');
  };

  const handleVideoDetails = async (videoId) => {
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;
    const url = `${http}://${host}/api/get_video_details`;
    const response = await axios.post(url, {tweet_id: videoId}, {headers: { 'X-Session-ID': sessionId }});
    setVideoDetails(response.data);
  };

  const onItemClicked = (item) => {
    router.push(`/?query=${encodeURIComponent(item)}`);
  };

  return (  
    <div key={`${videoId}-${refreshKey}`} className="bg-white rounded shadow p-4 relative flex flex-col">      
      <div className="w-full overflow-y-scroll flex-grow">  
        <blockquote className="twitter-tweet" data-media-max-width="560">  
          <a href={"https://twitter.com/i/status/" + videoId}></a>
        </blockquote>  
      </div>  
      {video && (
        <>
      <button className="text-lg font-semibold mt-4 mb-2">  {/*onClick={() => handleVideoClick(video)}*/}
        {video.title}  
      </button>  
      <div className="flex justify-between items-center">  
      
      <div data-tooltip-id={"video-details"}>  
          <button   
            className="text-white px-4 py-2 rounded border border-green-500 hover:bg-green-300"   
            onClick={() => handleVideoDetails(video.tweet_id)}  
            title="Detaylar için tıkla"
          >  
            ℹ️    
          </button>  
        </div>  
        <Tooltip id={"video-details"} openOnClick="true" closeEvents={["mouseleave"]} clickable="true">  
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
        <Tooltip id='refresh-button'>
          <div>  
            <p>  
              Yüklenmediyse yenile.  
            </p>  
          </div>
        </Tooltip>
        <button className="text-black px-4 py-2 rounded border border-green-500 hover:bg-green-300" onClick={() => handleDownload(video.tweet_id)}>  
          ⬇️ İndir  
        </button>   
      </div> 
      </>
    )}
    </div>  
  );
};

export default OneReaction;