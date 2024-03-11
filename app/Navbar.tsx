"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky flex items-center justify-end w-full h-20 px-4 md:justify-center bg-cyan-950">
      <ul
        className={`md:flex md:h-auto md:static md:text-center md:transform-none md:justify-center absolute top-20 right-0 w-full md:w-auto h-screen bg-cyan-950 transform transition-transform ease-in-out duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} text-white font-bold text-center p-4`}
      >
        <li className="mb-4 text-2xl transition-colors duration-300 md:mb-0 md:text-lg md:px-6">
          <Link className="hover:text-gray-400" href="/">
            Hem
          </Link>
        </li>
        <li className="mb-4 text-2xl md:mb-0 md:text-lg md:px-6">
          <Link className="hover:text-gray-400" href="/bookkeep">
            Bokför
          </Link>
        </li>
        <li className="mb-4 text-2xl md:mb-0 md:text-lg md:px-6">
          <Link className="hover:text-gray-400" href="/history">
            Historik
          </Link>
        </li>
        <li className="mb-4 text-2xl md:mb-0 md:text-lg md:px-6">
          <Link className="hover:text-gray-400" href="/invoice">
            Faktura
          </Link>
        </li>
      </ul>
      <div onClick={() => setIsOpen(!isOpen)} className="z-50 md:hidden">
        <svg
          className="w-8 h-8 text-white cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
