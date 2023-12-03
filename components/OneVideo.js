// components/OneVideo.js

import React, { useEffect } from 'react';  
  
const OneVideo = ({ tweetId }) => {  
  
  useEffect(() => {  
    if (window.twttr) {  
      window.twttr.widgets.load();  
    }  
  }, [tweetId]);
  
  return (   
    <div key={tweetId} className='w-full'>
        <blockquote className="twitter-tweet" data-media-max-width="560">
          <a href={`https://twitter.com/i/status/${tweetId}`}></a>  
        </blockquote>  
    </div>
  );
};  
  
export default OneVideo;

