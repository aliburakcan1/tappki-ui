// components/InfiniteBar.js

import React from 'react'

const InfiniteBar = ({ marqueeItems, onItemClicked }) => {
  return (
    <div class="relative flex overflow-x-hidden">
      <div class="py-12 animate-marquee whitespace-nowrap">
        {marqueeItems.people && marqueeItems.people.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            👤 {item}
          </button>
        ))}
        {marqueeItems.sport && marqueeItems.sport.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            ⚽ {item}
          </button>
        ))}
        {marqueeItems.tags && marqueeItems.tags.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            #️⃣ {item}
          </button>
        ))}
        {marqueeItems.program && marqueeItems.program.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            📺 {item}
          </button>
        ))}
        {marqueeItems.music && marqueeItems.music.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            🎵 {item}
          </button>
        ))}
        {marqueeItems.animal && marqueeItems.animal.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            🐾 {item}
          </button>
        ))}
      </div>

      <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
        {marqueeItems.people && marqueeItems.people.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            👤 {item}
          </button>
        ))}
        {marqueeItems.sport && marqueeItems.sport.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            ⚽ {item}
          </button>
        ))}
        {marqueeItems.tags && marqueeItems.tags.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            #️⃣ {item}
          </button>
        ))}
        {marqueeItems.program && marqueeItems.program.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            📺 {item}
          </button>
        ))}
        {marqueeItems.music && marqueeItems.music.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            🎵 {item}
          </button>
        ))}
        {marqueeItems.animal && marqueeItems.animal.map((item, index) => (
          <button key={index} class="text-2xl mx-4" onClick={() => onItemClicked(item)}>
            🐾 {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default InfiniteBar;