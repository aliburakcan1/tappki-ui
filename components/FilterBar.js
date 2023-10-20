// components/FilterBar.js

import React from "react";
import { useState } from "react";

const FilterBar = ({ onFilterClick }) => {
        const filterValues = ["Tepki", "Kişi", "Etiket", "Film/Dizi/Program/YT Kanalı", "Spor Dalı", "Müzik", "Hayvan"];
        const [filter, setFilter] = useState("Tepki"); // Set initial state to "person"
    
        const handleFilterClick = (value) => {
            setFilter(value);
            onFilterClick(value); // Call onFilterClick with the selected filter value
        };
        
        return (
            <div className="flex justify-center mt-4">
                {filterValues.map((value) => (
                    <button
                        key={value}
                        className={`mx-2 px-4 py-2 rounded-lg ${
                            filter === value ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                        }`}
                        onClick={() => handleFilterClick(value)}
                    >
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </button>
                ))}
            </div>
        );
    };

export default FilterBar;