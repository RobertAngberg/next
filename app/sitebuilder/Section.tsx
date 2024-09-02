import { useState } from "react";
import AddButton from "./AddButton";
import DisplayContent from "./DisplayContent";
import AddSectionsMenu from "./AddSectionsMenu";
import HeaderImage from "./HeaderImage";

type HandleAddContent = (kind: Content["kind"], text?: string, imageUrl?: string) => void;

function Section({ setSections, sections, sectionId }: SectionProps) {
  const [isAddingContentType, setIsAddingContentType] = useState<
    "header" | "text" | "image" | "twoColumns" | "threeColumns" | "headerImage" | null
  >(null);
  const [content, setContent] = useState<Content | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleAddContent: HandleAddContent = (kind, text, imageUrl) => {
    setContent({ kind, text, imageUrl });
    setIsAddingContentType(null);
    setShowOptions(false);
    setSections([...sections, sectionId + 1]);
  };

  const handlePlusClick = () => {
    setShowOptions(true);
  };

  const handleButtonClick = (
    type: "header" | "text" | "image" | "twoColumns" | "threeColumns" | "headerImage"
  ) => {
    setIsAddingContentType(type);
    setShowOptions(false);
  };

  const isHeaderImage = isAddingContentType === "headerImage";

  return (
    // Ta bort margin och padding om det är en headerbild
    <div className={isHeaderImage ? "" : "relative p-5 mb-4"}>
      {isHeaderImage && (
        <HeaderImage />
      )}

      <DisplayContent
        content={content}
        sections={sections}
        setSections={setSections}
        handleAddContent={handleAddContent}
        isAddingContentType={isAddingContentType}
      />

      {!content && !isAddingContentType && (
        <AddButton onClick={handlePlusClick} />
      )}

      {showOptions && <AddSectionsMenu handleButtonClick={handleButtonClick} />}
    </div>
  );
}

export default Section;

