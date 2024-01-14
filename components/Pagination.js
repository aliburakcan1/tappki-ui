//components/Pagination.js

import React from 'react';  

const Pagination = ({ totalVideos, videosPerPage, currentPage, onPageChange, searchTerm }) => {  
  const totalPages = Math.ceil(totalVideos / videosPerPage);  
  
  const handlePageClick = (page) => {    
    onPageChange(page, searchTerm);    
};  
 
   
  
  const renderPages = () => {  
    const pages = [];  
    for (let i = 1; i <= totalPages; i++) {  
      pages.push(  
        <button  
          key={i}  
          onClick={() => handlePageClick(i)}  
          className={`mx-1 my-1 py-2 px-4 rounded bg-white text-gray-800 border border-gray-400 ${  
            currentPage === i ? 'font-bold' : ''  
          }`}  
        >  
          {i}  
        </button>  
      );  
    }  
    return pages;  
  };  
  
  return (  
    <div className="flex justify-center my-8">  
      <div className="flex flex-wrap justify-center">  
        {currentPage > 1 && (  
          <button  
            onClick={() => handlePageClick(currentPage - 1)}  
            className="mx-1 my-1 py-2 px-4 rounded bg-white text-gray-800 border border-gray-400"  
          >  
            Önceki  
          </button>  
        )}  
        {renderPages()}  
        {currentPage < totalPages && (  
          <button  
            onClick={() => handlePageClick(currentPage + 1)}  
            className="mx-1 my-1 py-2 px-4 rounded bg-white text-gray-800 border border-gray-400"  
          >  
            Sonraki  
          </button>  
        )}  
      </div>  
    </div>  
  );  
};  
  
export default Pagination;  
