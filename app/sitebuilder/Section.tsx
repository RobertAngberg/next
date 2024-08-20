import { useState } from "react";
import ContentHeader from "./ContentHeader";
import ContentText from "./ContentText";

function Section({ setSections, sections }: SectionProps) {

  const [isAddingContent, setIsAddingContent] = useState<"header" | "text" | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleAddContent: HandleAddContent = (kind, text) => {
    setContent({ kind, text });
    setIsAddingContent(null);
    setShowOptions(false);
    setSections([...sections, sections.length + 1]);
  };

  const handlePlusClick = () => {
    setShowOptions(true);
  };

  const handleButtonClick = (type: "header" | "text") => {
    setIsAddingContent(type);
    setShowOptions(false);
  };

  return (
    <div className="relative p-5 border border-gray-300 mb-4">
      {content?.kind === "header" ? (
        <h1 className="text-2xl font-bold">{content.text}</h1>
      ) : (
        <p>{content?.text}</p>
      )}

      {!content && !isAddingContent && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="bg-gray-600 text-white w-16 h-16 rounded-full flex justify-center items-center cursor-pointer text-3xl leading-none transition-all duration-500 transform hover:opacity-100 hover:scale-110 hover:shadow-2xl opacity-0 scale-90"
            onClick={handlePlusClick}
          >
            +
          </div>
        </div>
      )}

      {showOptions && (
        <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2">
          <div className="flex space-x-2 bg-gray-600 p-2 rounded-lg mt-3">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
              onClick={() => handleButtonClick("header")}
            >
              Header
            </button>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
              onClick={() => handleButtonClick("text")}
            >
              Text
            </button>
          </div>
        </div>
      )}

      {isAddingContent === "header" && <ContentHeader handleAddContent={handleAddContent} />}
      {isAddingContent === "text" && <ContentText handleAddContent={handleAddContent} />}
    </div>
  );
}

export default Section;
