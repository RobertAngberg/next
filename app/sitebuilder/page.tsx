"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import Section from "./Section";
import HeaderImage from "./HeaderImage";
import Footer from "./Footer";

function Sitebuilder() {
  const [sections, setSections] = useState<number[]>([1]);

  return (
    <main className="flex justify-center items-start min-h-screen bg-slate-50">
      <div className="w-2/3 min-h-screen bg-white shadow-lg shadow-slate-400 flex flex-col">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <Navbar />
          </div>

          <div className="mt-4">
            <HeaderImage />
          </div>
        </div>

        <div className="px-6 py-0 flex-grow">
          {sections.map((sectionId) => (
            <Section
              key={sectionId}
              sections={sections}
              setSections={setSections}
              sectionId={sectionId}
            />
          ))}
        </div>

        <Footer />
      </div>
    </main>
  );
}

export default Sitebuilder;
