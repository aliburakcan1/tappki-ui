// components/Header.js

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 140) {
        setAnimateHeader(true);
      } else setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const menuItems = [
    { title: "Ana Sayfa", url: "/" },
    { title: "Popüler", url: "/popular-videos" },
    { title: "Rastgele", url: "/random-reaction" }
  ];

  return (
    <header
      className={`w-full fixed z-10 trasition ease-in-out duration-500 ${
        animateHeader && "shadow-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto ">
        <div
          className={`flex max-w-screen-xl py-10 ${
            animateHeader && "py-5"
          } mx-auto items-center justify-between px-8 trasition ease-in-out duration-500`}
        >
          <Link href="/">
              <img src="/tappki_logo2.png" alt="Tappki Logo" className="h-10" />
          </Link>
          <nav className="backdrop-filter backdrop-blur-lg">
            <ul className="flex items-center justify-start">
              {menuItems?.map((item) => (
                <li key={item?.title}>
                  <Link className="px-2 lg:px-6 py-6 text-md border-b-2 border-transparent hover:border-indigo-400 leading-[22px] md:px-3 text-gray-400 hover:text-indigo-500" href={item?.url}>
                      {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;