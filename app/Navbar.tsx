"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const renderMenuLinks = () => (
    <>
      <li className="mb-4 text-2xl md:mb-0 md:text-lg md:px-6 md:text-white md:font-bold">
        <Link href="/">Hem</Link>
      </li>
      <li className="mb-4 text-2xl md:mb-0 md:text-lg md:px-6 md:text-white md:font-bold">
        <Link href="/bookkeep">Bokför</Link>
      </li>
      <li className="mb-4 text-2xl md:mb-0 md:text-lg md:px-6 md:text-white md:font-bold">
        <Link href="/history">Historik</Link>
      </li>
      <li className="mb-4 text-2xl md:mb-0 md:text-lg md:px-6 md:text-white md:font-bold">
        <Link href="/invoice">Faktura</Link>
      </li>
    </>
  );

  return (
    <div className="sticky flex items-center justify-end w-full h-20 px-4 md:justify-center bg-cyan-950">
      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-20 right-0 w-full h-screen bg-cyan-950 text-white font-bold text-center p-4 md:hidden">
          {renderMenuLinks()}
        </ul>
      )}

      {/* Desktop Menu */}
      <ul className="hidden md:flex md:static md:text-center md:justify-center md:w-auto md:h-auto">
        {renderMenuLinks()}
      </ul>

      {/* Hamburger Menu Icon */}
      <div onClick={() => setIsOpen(!isOpen)} className="z-50 md:hidden">
        <svg
          className="w-8 h-8 text-white cursor-pointer"
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
            <path
              className="transition-all duration-300 ease-in-out"
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
