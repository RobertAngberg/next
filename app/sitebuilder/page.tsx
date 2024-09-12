"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import Section from "./Section";
import HeroImage from "./HeroImage";
import Footer from "./Footer";

function Sitebuilder() {
  const [sections, setSections] = useState<number[]>([1]);
  const [nextSectionId, setNextSectionId] = useState(2);

  return (
    <main className="flex justify-center items-start min-h-screen bg-slate-50">
      <div className="w-2/3 min-h-screen bg-white shadow-lg shadow-slate-400 flex flex-col">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <Navbar />
          </div>

          <div className="mt-4">
            <HeroImage />
          </div>
        </div>

        <div className="px-6 py-0 mb-60 flex-grow">
          {sections.map((sectionId) => (
            <Section
              key={sectionId}
              sections={sections}
              setSections={(newSections) => {
                setSections(newSections);
                setNextSectionId(nextSectionId + 1);
              }}
              sectionId={sectionId}
              nextSectionId={nextSectionId}
            />
          ))}
        </div>

        <Footer />
      </div>
    </main>
  );
}

export default Sitebuilder;
