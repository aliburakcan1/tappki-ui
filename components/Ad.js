// Ad.js
import React, { useEffect, useRef } from 'react';

const Ad = () => {
  const adRef = useRef();  

  const atOptions = {  
    'key' : '91b62efb4f7421a4b609bf18e8897bac',  
    'format' : 'iframe',  
    'height' : 250,  
    'width' : 300,  
    'params' : {}  
  };  

  useEffect(() => {  
    if (adRef.current && !adRef.current.firstChild) {  
      const conf = document.createElement('script');  
      const script = document.createElement('script');  
      script.type = 'text/javascript';  
      script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`;  
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;  

      adRef.current.appendChild(conf);  
      adRef.current.appendChild(script);  
    }  
  }, []);

  return <div ref={adRef} />;
};

export default Ad;
