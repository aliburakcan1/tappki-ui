import React, { useState, useEffect } from "react";
import { SessionContext } from '../app/SessionContext';  
import { useContext } from 'react'; 
import axios from 'axios';  


const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { sessionId } = useContext(SessionContext); // get sessionId from context


  const fetchSuggestions = async () => {
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;  
    const url = `${http}://${host}/api/suggestions`;
    const response = await axios.get(url, {  
      headers: { 'X-Session-ID': sessionId }, // add header to request 
    });
    const data = response.data;
    setSuggestions(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // if suggestions is empty, fetch suggestions onFocus
        onFocus={() => suggestions.length === 0 && fetchSuggestions()}
        className="w-full rounded-full p-4 border border-gray-300 outline-none focus:border-blue-500"
        placeholder="Tepki ara.."
        list="suggestions"
      />
      <datalist id="suggestions">
        {suggestions.map((suggestion) => (
          <option key={suggestion} value={suggestion} />
        ))}
      </datalist>
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
