import Section from "./Section";

interface SectionProps {
  sections: number[];
  setSections: React.Dispatch<React.SetStateAction<number[]>>;
}

function ContentTwoColumns({ sections, setSections }: SectionProps) {
  // Generate two new unique IDs for the columns
  const firstColumnId = sections.length + 1;
  const secondColumnId = sections.length + 2;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Section
        key={firstColumnId}
        sections={sections}
        setSections={setSections}
        sectionId={firstColumnId}
        isInTwoColumns={true}
      />
      <Section
        key={secondColumnId}
        sections={sections}
        setSections={setSections}
        sectionId={secondColumnId}
        isInTwoColumns={true}
      />
    </div>
  );
}

export default ContentTwoColumns;
