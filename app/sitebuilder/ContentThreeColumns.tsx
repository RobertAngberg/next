import { useState } from "react";
import Section from "./Section";

function ContentThreeColumns({ sections, setSections }: SectionProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {sections.map((sectionId) => (
        <Section key={sectionId} sections={sections} setSections={setSections} />
      ))}
    </div>
  );
}

export default ContentThreeColumns;
