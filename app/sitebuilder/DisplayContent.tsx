import ContentHeader from "./ContentHeader";
import ContentText from "./ContentText";
import ContentImage from "./ContentImage";
import ContentTwoColumns from "./ContentTwoColumns";
import ContentThreeColumns from "./ContentThreeColumns";

interface DisplayContentProps {
  content: {
    kind: "header" | "text" | "image" | "twoColumns" | "threeColumns";
    text?: string;
    imageUrl?: string;
  } | null;
  sections: number[];
  setSections: React.Dispatch<React.SetStateAction<number[]>>;
  handleAddContent: (kind: "header" | "text" | "image" | "twoColumns" | "threeColumns", text?: string, imageUrl?: string) => void;
  isAddingContent: "header" | "text" | "image" | "twoColumns" | "threeColumns" | null;
}

const DisplayContent: React.FC<DisplayContentProps> = ({ content, sections, setSections, handleAddContent, isAddingContent }) => {
  return (
    <>
      {content?.kind === "header" && <h1 className="text-2xl font-bold">{content.text}</h1>}
      {content?.kind === "text" && <p>{content?.text}</p>}
      {content?.kind === "image" && (
        <img 
          src={content.imageUrl} 
          alt="Cropped" 
          className="max-h-[500px] object-contain" 
          style={{ maxWidth: '100%', width: 'auto', height: 'auto' }} 
        />
      )}
      {content?.kind === "twoColumns" && (
        <ContentTwoColumns sections={sections} setSections={setSections} />
      )}
      {content?.kind === "threeColumns" && (
        <ContentThreeColumns sections={sections} setSections={setSections} />
      )}

      {isAddingContent === "header" && <ContentHeader handleAddContent={handleAddContent} />}
      {isAddingContent === "text" && <ContentText handleAddContent={handleAddContent} />}
      {isAddingContent === "image" && 
        <ContentImage onImageCrop={(croppedImageUrl: string) => handleAddContent('image', undefined, croppedImageUrl)} />
      }
      {isAddingContent === "twoColumns" && 
        <ContentTwoColumns sections={sections} setSections={setSections} />
      }
      {isAddingContent === "threeColumns" && 
        <ContentThreeColumns sections={sections} setSections={setSections} />
      }
    </>
  );
};

export default DisplayContent;
