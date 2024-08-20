"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import Section from "./Section";

function Sitebuilder() {

  const [sections, setSections] = useState<number[]>([1]);

  // Hanterar tillägg av en ny sektion efter givet index eller i slutet om inget ges
  const handleAddSection = (index?: number) => {
  // Sections sparas i en array. Här skapas en ny section
  const newSectionId = sections.length + 1;
  // Om ett index ges, kopiera arrayen och infoga den nya sektionen efter den angivna indexen
  if (typeof index === "number") {
      // Skapar en kopia av den nuvarande sektionens array
      const newSections = [...sections];
      // Infogar den nya sektionen direkt efter den angivna indexen. Inget tas bort
      // Galenskap - Mouse over splice för att se hjälptexten
      newSections.splice(index + 1, 0, newSectionId);
      setSections(newSections);
  } else {
      // Om ingen index ges, lägg till den nya sektionen i slutet av arrayen.
      setSections([...sections, newSectionId]);
  }
};

  return (
    <main className="flex justify-center items-start min-h-screen bg-slate-50">
      <div className="w-2/3 h-screen bg-white shadow-lg shadow-slate-400">
        <div className="flex justify-between items-center px-6 py-4">
          <Logo />
          <Navbar />
        </div>
        <div className="px-6 py-4">
          {sections.map((sectionId, index) => (
            <Section key={sectionId} onContentAdded={() => handleAddSection(index)} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Sitebuilder;
