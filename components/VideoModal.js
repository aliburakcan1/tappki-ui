// components/VideoModal.js

import React, { useEffect, useContext, useState, useMemo } from 'react';
import axios from 'axios';
import { SessionContext } from '../app/SessionContext';

const AnnotationPage = ({ annotation, onClose, setCurrentPage }) => {
    return (
        <div className="overflow-auto h-full">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Field</th>
                        <th className="px-4 py-2">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">tweet_id</td>
                        <td className="border px-4 py-2">{annotation.tweet_id}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">content</td>
                        <td className="border px-4 py-2">{annotation.content}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">people</td>
                        <td className="border px-4 py-2">{annotation.people ? annotation.people.join(', ') : ''}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">tags</td>
                        <td className="border px-4 py-2">{annotation.tags ? annotation.tags.join(', ') : ''}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">program</td>
                        <td className="border px-4 py-2">{annotation.program}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">music</td>
                        <td className="border px-4 py-2">{annotation.music}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">animal</td>
                        <td className="border px-4 py-2">{annotation.animal}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">sport</td>
                        <td className="border px-4 py-2">{annotation.sport}</td>
                    </tr>
                </tbody>
            </table>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4"  
                    onClick={() => setCurrentPage(1)}>  
                Video  
            </button>  
            <button className="bg-blue-500 text-white px-4 py-2 rounded ml-4" onClick={onClose}>  
                Kapat  
            </button>
        </div>
    );
};

const VideoPage = ({ video, onClose, setCurrentPage }) => {
    
    const [key, setKey] = useState(Date.now());  
  
    useEffect(() => {  
        if (window.twttr) {  
            window.twttr.widgets.load();  
        }  
    }, [key]);

    return (
        <div className="overflow-auto h-full w-full" key={key}>
            <div className="w-full overflow-y-scroll" style={{ maxHeight: '400px' }}>
                <blockquote className="twitter-tweet">
                    <a href={video.url}></a>
                </blockquote>
            </div>
            <h2 className="text-lg font-semibold mt-4 mb-2">{video.title}</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => {setCurrentPage(2); setKey(Date.now());}}>  
                Annotation  
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded ml-4" onClick={onClose}>
                Kapat
            </button>
        </div>
    );
};

const VideoModal = ({ video, onClose }) => {
    const { sessionId } = useContext(SessionContext); // get sessionId from context
    const [annotation, setAnnotation] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const videoData = useMemo(() => video, [video]);  


    useEffect(() => {
        const video_url = new URL(videoData.url);  
        const tweetId = video_url.pathname.split('/')[3];
        const data = { tweet_id: tweetId };
        const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
        const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;
        const url = `${http}://${host}/api/get_annotation`;
        axios
            .post(url, data, {
                headers: { 'X-Session-ID': sessionId }, // add header to request
            })
            .then((response) => {
                setAnnotation(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        if (window.twttr) {
            window.twttr.widgets.load();
        }
    }, [video]);

    return (
        <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                <div className="bg-white rounded-lg p-8 z-30 max-w-screen-md">
                    <div className="flex flex-row h-full">
                        {currentPage === 1 ? (
                            <VideoPage video={videoData} onClose={onClose} setCurrentPage={setCurrentPage}/>
                        ) : (
                            <AnnotationPage annotation={annotation} onClose={onClose} setCurrentPage={setCurrentPage}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;