"use client";

import { Logo } from "./Logo";
import { Navbar } from "./Navbar";

function Sitebuilder() {
  return (
    <main className="flex justify-center items-start min-h-screen bg-slate-50">
      <div className="w-2/3 h-screen bg-white shadow-lg shadow-slate-400 mt-10">
        <div className="flex justify-between items-center px-6 py-4">
          <Logo />
          <Navbar />
        </div>
      </div>
    </main>
  );
}

export default Sitebuilder;
