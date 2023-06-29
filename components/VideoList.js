import React, { useEffect } from 'react';  
  
const VideoList = ({ videos }) => {  
  useEffect(() => {  
    if (window.twttr) {  
      window.twttr.widgets.load();  
    }  
  }, [videos]);  
  
  return (  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"> {/* Responsive grid layout */}  
      {videos.map((video) => (  
        <div key={video.id} className="bg-white rounded shadow p-4">  
          <div className="w-full overflow-y-scroll" style={{ maxHeight: '400px' }}>  
            <blockquote className="twitter-tweet">  
              <a href={video.url}></a>  
            </blockquote>  
          </div>  
          <h3 className="text-lg font-semibold mt-4">{video.title}</h3>  
        </div>  
      ))}  
    </div>  
  );  
};  
  
export default VideoList;  
