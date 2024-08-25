import Section from "./Section";

function ContentTwoColumns({ sections, setSections, sectionId }: ContentTwoColumnsProps) {

  return (
    <div className="grid grid-cols-2 gap-4">
      <Section
              key={sectionId}
              sections={sections}
              setSections={setSections}
              sectionId={sectionId}
            />
      <Section
              key={sectionId}
              sections={sections}
              setSections={setSections}
              sectionId={sectionId}
            />
    </div>
  );
}

export default ContentTwoColumns;
