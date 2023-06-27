import React from "react";  
  
const VideoList = ({ videos }) => {  
  return (  
    <div className="grid grid-cols-4 gap-4">  
      {videos.map((video) => (  
        <div key={video.id} className="bg-white rounded shadow p-4">  
          <img  
            src={video.thumbnail_url}  
            alt={video.title}  
            className="w-full h-48 object-cover rounded"  
          />  
          <h3 className="text-lg font-semibold mt-4">{video.title}</h3>  
        </div>  
      ))}  
    </div>  
  );  
};  
  
export default VideoList;  
