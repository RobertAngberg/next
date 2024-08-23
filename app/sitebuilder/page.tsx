"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import Section from "./Section";

function Sitebuilder() {
  const [sections, setSections] = useState<number[]>([1]);

  return (
    <main className="flex justify-center items-start min-h-screen bg-slate-50">
      <div className="w-2/3 min-h-screen bg-white shadow-lg shadow-slate-400">
        <div className="flex justify-between items-center px-6 py-4">
          <Logo />
          <Navbar />
        </div>
        <div className="px-6 py-4">
          {sections.map((sectionId) => (
            <Section
              key={sectionId}
              sections={sections}
              setSections={setSections}
              sectionId={sectionId}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Sitebuilder;
