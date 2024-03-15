"use client";

import Link from "next/link";
import { useState } from "react";
// import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const renderMenuLinks = () => (
    <>
      <li
        onClick={closeMenu}
        className="transition-colors duration-300 hover:text-slate-400 mb-6 md:mb-0 md:text-lg md:px-6 md:text-white md:font-bold"
      >
        <Link href="/">Hem</Link>
      </li>
      <li
        onClick={closeMenu}
        className="transition-colors duration-300 hover:text-slate-400 mb-6 md:mb-0 md:text-lg md:px-6 md:text-white md:font-bold"
      >
        <Link href="/bookkeep">Bokför</Link>
      </li>
      <li
        onClick={closeMenu}
        className="transition-colors duration-300 hover:text-slate-400 mb-6 md:mb-0 md:text-lg md:px-6 md:text-white md:font-bold"
      >
        <Link href="/history">Historik</Link>
      </li>
      <li
        onClick={closeMenu}
        className="transition-colors duration-300 hover:text-slate-400 mb-6 md:mb-0 md:text-lg md:px-6 md:text-white md:font-bold"
      >
        <Link href="/invoice">Faktura</Link>
      </li>
      <li className="mt-20 md:hidden">
        {/* <LogoutButton /> */}
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 flex items-center justify-end w-full h-20 px-4 bg-cyan-950 md:justify-center">
      {/* Mobile */}
      {isOpen && (
        <ul className="text-4xl absolute p-6 pr-10 top-20 right-0 w-full h-screen bg-cyan-950 text-white font-bold text-right">
          {renderMenuLinks()}
        </ul>
      )}
      {/* Desktop */}
      <ul className="hidden md:flex md:static md:text-center md:justify-center md:w-auto md:h-auto">
        {renderMenuLinks()}
      </ul>
      {/* Hamburger */}
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
      <div className="hidden md:block">
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
}
