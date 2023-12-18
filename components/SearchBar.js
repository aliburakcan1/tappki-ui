// components/SearchBar.js

import React, { useState, useEffect } from "react";
//import { SessionContext } from '../app/SessionContext';  
//import { useContext } from 'react'; 


const SearchBar = ({ onSubmit, filter }) => {
  const [query, setQuery] = useState("");
  //const { sessionId } = useContext(SessionContext); // get sessionId from context


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="w-full rounded-full p-4 border border-gray-300 outline-none focus:border-blue-500"
        placeholder="Tepki ara..."
        list="suggestions"
        //autoComplete="off" // add autocomplete attribute to disable default behavior on mobile devices
      />
      <button
        type="submit"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 text-white p-2 rounded-full focus:outline-none"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
