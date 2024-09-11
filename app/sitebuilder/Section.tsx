import React, { useState, useRef, useEffect } from "react";
import AddButton from "./AddButton";
import DisplayContent from "./DisplayContent";
import AddSectionsMenu from "./AddSectionsMenu";
import HeaderImage from "./HeroImage";

function Section({ setSections, sections, sectionId }: SectionProps) {
  const [isAddingContentType, setIsAddingContentType] = useState<
    "header" | "text" | "image" | "twoColumns" | "threeColumns" | "headerImage" | null
  >(null);
  const [content, setContent] = useState<Content | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleAddContent: HandleAddContent = (kind, text, imageUrl) => {
    setContent({ kind, text, imageUrl });
    setIsAddingContentType(null);
    setShowOptions(false);
    setSections([...sections, sectionId + 1]);
  };

  // Funktion för att hantera klick på plus-knappen
  const handlePlusClick = () => {
    setShowOptions(!showOptions); // Växla synlighet för menyn
  };

  // Funktion för att hantera klick på en av menyknapparna
  const handleButtonClick = (
    type: "header" | "text" | "image" | "twoColumns" | "threeColumns" | "headerImage"
  ) => {
    setIsAddingContentType(type);
    setShowOptions(false); // Stäng menyn efter att en knapp har valts
  };

  const isHeaderImage = isAddingContentType === "headerImage";

  // Lyssna efter klick utanför menyn för att stänga den
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Om klicket inte sker inom menyn (menuRef), stäng menyn
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Rensa event listener när komponenten avmonteras eller när showOptions ändras
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    // Om det är en headerImage, använd inte padding och margin
    <div className={isHeaderImage ? "" : "relative p-5 py-2 mb-4"}>
      {isHeaderImage && <HeaderImage />}

      <DisplayContent
        content={content}
        sections={sections}
        setSections={setSections}
        handleAddContent={handleAddContent}
        isAddingContentType={isAddingContentType}
      />

      {!content && !isAddingContentType && <AddButton onClick={handlePlusClick} />}

      {showOptions && (
        <div ref={menuRef}>
          <AddSectionsMenu handleButtonClick={handleButtonClick} />
        </div>
      )}
    </div>
  );
}

export default Section;
