// components/SearchBar.js

import React, { useState, useEffect } from "react";
import { SessionContext } from '../app/SessionContext';  
import { useContext } from 'react'; 
import axios from 'axios';  


const SearchBar = ({ onSubmit, filter }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState({}); // Add allSuggestions state variable
  const [suggestionsFetched, setSuggestionsFetched] = useState(false); // Add suggestionsFetched state variable
  const { sessionId } = useContext(SessionContext); // get sessionId from context

  const filterMapping = {
    "Kişi": "people",
    "Hayvan": "animal",
    "Etiket": "tags",
    "Film/Dizi/Program/YT Kanalı": "program",
    "Spor Dalı": "sport",
    "Müzik": "music",
    "Tepki": "reaction"
  };

  const fetchSuggestions = async () => {
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;  
    const http = process.env.NEXT_PUBLIC_BACKEND_HTTP;  
    const url = `${http}://${host}/api/suggestions`;
    const response = await axios.get(url, {  
      headers: { 'X-Session-ID': sessionId }, // add header to request 
    });
    const data = response.data;
    setAllSuggestions(data);
    const englishFilter = filterMapping[filter];
    setSuggestions(data[englishFilter]);
    setSuggestionsFetched(true); // set suggestionsFetched to true after fetching suggestions
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  useEffect(() => {
    const englishFilter = filterMapping[filter];
    setSuggestions(allSuggestions[englishFilter]);
    if (!suggestionsFetched) { // fetch suggestions only if they haven't been fetched yet
      fetchSuggestions();
    }
  }, [filter]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-full p-4 border border-gray-300 outline-none focus:border-blue-500"
        placeholder={`${filter ? `${filter.charAt(0).toUpperCase() + filter.slice(1)} ara...` : "Tepki ara..."}`}
        list="suggestions"
      />
      <datalist id="suggestions">
        {suggestions && suggestions.map((suggestion) => (
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
