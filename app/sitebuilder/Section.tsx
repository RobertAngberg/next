import { useState } from "react";
import AddButton from "./AddButton";
import DisplayContent from "./DisplayContent";
import AddSectionsMenu from "./AddSectionsMenu";

interface SectionProps {
  sections: number[];
  setSections: React.Dispatch<React.SetStateAction<number[]>>;
  isInTwoColumns?: boolean; // New prop to control AddButton display in two-column layout
  sectionId: number; // Unique ID for each section
}

interface Content {
  kind: "header" | "text" | "image" | "twoColumns" | "threeColumns";
  text?: string;
  imageUrl?: string;
}

type HandleAddContent = (kind: "header" | "text" | "image" | "twoColumns" | "threeColumns", text?: string, imageUrl?: string) => void;

function Section({ setSections, sections, isInTwoColumns = false, sectionId }: SectionProps) {
  const [isAddingContent, setIsAddingContent] = useState<"header" | "text" | "image" | "twoColumns" | "threeColumns" | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleAddContent: HandleAddContent = (kind, text, imageUrl) => {
    setContent({ kind, text, imageUrl });
    setIsAddingContent(null);
    setShowOptions(false);

    if (!isInTwoColumns) {
      setSections([...sections, sectionId + 1]);
    }
  };

  const handlePlusClick = () => {
    setShowOptions(true);
  };

  const handleButtonClick = (type: "header" | "text" | "image" | "twoColumns" | "threeColumns") => {
    setIsAddingContent(type);
    setShowOptions(false);
  };

  return (
    <div className="relative p-5 mb-4">
      <DisplayContent
        content={content}
        sections={sections}
        setSections={setSections}
        handleAddContent={handleAddContent}
        isAddingContent={isAddingContent}
      />

      {!content && !isAddingContent && (
        <AddButton onClick={handlePlusClick} />
      )}

      {showOptions && <AddSectionsMenu handleButtonClick={handleButtonClick} />}
    </div>
  );
}

export default Section;
