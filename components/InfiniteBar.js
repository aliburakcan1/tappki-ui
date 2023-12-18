// components/InfiniteBar.js

import React from 'react'

const InfiniteBar = ({ marqueeItems, onItemClicked }) => {
  return (
    <div class="relative flex overflow-x-hidden">
      <div class="py-12 animate-marquee whitespace-nowrap">
      {marqueeItems.people && marqueeItems.people.map((item, index) => (
        <span 
          key={index} 
          className="text-2xl mx-4" 
          onClick={() => onItemClicked(item)}
        >
          👤 {item}
        </span>
      ))}
        {marqueeItems.sport && marqueeItems.sport.map((item, index) => (
          <span key={index} class="text-2xl mx-4">⚽ {item}</span>
        ))}
        {marqueeItems.tags && marqueeItems.tags.map((item, index) => (
          <span key={index} class="text-2xl mx-4">#️⃣ {item}</span>
        ))}
        {marqueeItems.program && marqueeItems.program.map((item, index) => (
          <span key={index} class="text-2xl mx-4">📺 {item}</span>
        ))}
        {marqueeItems.music && marqueeItems.music.map((item, index) => (
          <span key={index} class="text-2xl mx-4">🎵 {item}</span>
        ))}
        {marqueeItems.animal && marqueeItems.animal.map((item, index) => (
          <span key={index} class="text-2xl mx-4">🐾 {item}</span>
        ))}
      </div>

      <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
        {marqueeItems.people && marqueeItems.people.map((item, index) => (
          <span key={index} class="text-2xl mx-4">👤 {item}</span>
        ))}
        {marqueeItems.sport && marqueeItems.sport.map((item, index) => (
          <span key={index} class="text-2xl mx-4">⚽ {item}</span>
        ))}
        {marqueeItems.tags && marqueeItems.tags.map((item, index) => (
          <span key={index} class="text-2xl mx-4">#️⃣ {item}</span>
        ))}
        {marqueeItems.program && marqueeItems.program.map((item, index) => (
          <span key={index} class="text-2xl mx-4">📺 {item}</span>
        ))}
        {marqueeItems.music && marqueeItems.music.map((item, index) => (
          <span key={index} class="text-2xl mx-4">🎵 {item}</span>
        ))}
        {marqueeItems.animal && marqueeItems.animal.map((item, index) => (
          <span key={index} class="text-2xl mx-4">🐾 {item}</span>
        ))}
      </div>
    </div>
  )
}

export default InfiniteBar