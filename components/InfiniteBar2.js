// components/InfiniteBar2.js

import React from 'react'

const InfiniteBar2 = ({ marqueeItems, onItemClicked }) => {
    if (!marqueeItems || !marqueeItems.people) {
        return null; // or return a loading state
    }
    return (
            <div class="group relative overflow-hidden whitespace-nowrap py-10 [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]">
                <div class="animate-slide-left-infinite group-hover:animation-pause inline-block w-max">
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.people[0])}>
                        👤 {marqueeItems.people[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.people[1])}>
                        👤 {marqueeItems.people[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.sport[0])}>
                        ⚽ {marqueeItems.sport[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.sport[1])}>
                        ⚽ {marqueeItems.sport[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.tags[0])}>
                        #️⃣ {marqueeItems.tags[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.tags[1])}>
                        #️⃣ {marqueeItems.tags[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.program[0])}>
                        📺 {marqueeItems.program[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.program[1])}>
                        📺 {marqueeItems.program[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.music[0])}>
                        🎵 {marqueeItems.music[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.music[1])}>
                        🎵 {marqueeItems.music[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.animal[0])}>
                        🐾 {marqueeItems.animal[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.animal[1])}>
                        🐾 {marqueeItems.animal[1]}
                    </button>
                </div>

                <div class="animate-slide-left-infinite group-hover:animation-pause inline-block w-max">
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.people[0])}>
                        👤 {marqueeItems.people[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.people[1])}>
                        👤 {marqueeItems.people[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.sport[0])}>
                        ⚽ {marqueeItems.sport[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.sport[1])}>
                        ⚽ {marqueeItems.sport[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.tags[0])}>
                        #️⃣ {marqueeItems.tags[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.tags[1])}>
                        #️⃣ {marqueeItems.tags[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.program[0])}>
                        📺 {marqueeItems.program[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.program[1])}>
                        📺 {marqueeItems.program[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.music[0])}>
                        🎵 {marqueeItems.music[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.music[1])}>
                        🎵 {marqueeItems.music[1]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.animal[0])}>
                        🐾 {marqueeItems.animal[0]}
                    </button>
                    <button class="text-2xl mx-4" onClick={() => onItemClicked(marqueeItems.animal[1])}>
                        🐾 {marqueeItems.animal[1]}
                    </button>
                </div>
            </div>
    )
}

export default InfiniteBar2;
