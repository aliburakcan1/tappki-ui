// components/Header.js
import React from 'react';
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-100 py-4 px-8 flex justify-between items-center">
      <div>
      <Link href="/">
          Tepki
        </Link>
      </div>
      <div>
        <Link href="/random-reaction">
          Random Reaction
        </Link>
      </div>
    </header>
  );
};

export default Header;