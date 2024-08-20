"use client";

import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const renderMenuLinks = () => (
    <>
      <li
        onClick={closeMenu}
        className="transition-colors duration-300 hover:text-slate-400 mb-6 md:mb-0 md:text-lg md:px-4 md:text-slate-600"
      >
        <Link href="/">Hem</Link>
      </li>
      <li
        onClick={closeMenu}
        className="transition-colors duration-300 hover:text-slate-400 mb-6 md:mb-0 md:text-lg md:px-4 md:text-slate-600"
      >
        <Link href="/">Priser</Link>
      </li>
      <li
        onClick={closeMenu}
        className="transition-colors duration-300 hover:text-slate-400 mb-6 md:mb-0 md:text-lg md:px-4 md:text-slate-600"
      >
        <Link href="/">Kontakt</Link>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 flex items-center justify-end w-full h-20 bg-white md:justify-end md:pl-0">
      {/* Mobile */}
      {isOpen && (
        <ul className="text-4xl absolute p-6 pr-10 top-20 right-0 w-full h-screen bg-white text-slate-600 font-bold text-right">
          {renderMenuLinks()}
        </ul>
      )}
      {/* Desktop */}
      <ul className="hidden md:flex md:static md:text-right md:justify-end md:w-auto md:h-auto md:mr-4">
        {renderMenuLinks()}
      </ul>
      {/* Hamburger */}
      <div onClick={() => setIsOpen(!isOpen)} className="z-50 md:hidden">
        <svg
          className="w-8 h-8 text-slate-600 cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <path
            className={`transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}
            d="M4 6h16"
          />
          <path
            className={`transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}
            d="M4 12h16"
          />
          <path
            className={`transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}
            d="M4 18h16"
          />
          {isOpen && (
            <path className="transition-all duration-300 ease-in-out" d="M6 18L18 6M6 6l12 12" />
          )}
        </svg>
      </div>
    </div>
  );
}

export { Navbar };
