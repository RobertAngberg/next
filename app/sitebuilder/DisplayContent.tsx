import ContentHeader from "./ContentHeader";
import ContentText from "./ContentText";
import ContentImage from "./ContentImage";
import ContentTwoColumns from "./ContentTwoColumns";
import ContentThreeColumns from "./ContentThreeColumns";

function DisplayContent({ content, sections, setSections, 
  handleAddContent, isAddingContentType }: DisplayContentProps) {
    
  return (
    <>
      {content?.kind === "header" && <h1 className="text-2xl font-bold">{content.text}</h1>}
      {content?.kind === "text" && <p>{content?.text}</p>}
      {content?.kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={content.imageUrl} 
          alt="Cropped" 
          className="max-h-[500px] object-contain" 
          style={{ maxWidth: '100%', width: 'auto', height: 'auto' }} 
        />
      )}
      {content?.kind === "twoColumns" && (
        <ContentTwoColumns sections={sections} setSections={setSections} sectionId={0} />
      )}
      {content?.kind === "threeColumns" && (
        <ContentThreeColumns sections={sections} setSections={setSections} sectionId={0} />
      )}

      {isAddingContentType === "header" && <ContentHeader handleAddContent={handleAddContent} />}
      {isAddingContentType === "text" && <ContentText handleAddContent={handleAddContent} />}
      {isAddingContentType === "image" && 
        <ContentImage onImageCrop={(croppedImageUrl: string) => handleAddContent('image', undefined, croppedImageUrl)} />
      }
      {isAddingContentType === "twoColumns" && 
        <ContentTwoColumns sections={sections} setSections={setSections} sectionId={0} />
      }
      {isAddingContentType === "threeColumns" && 
        <ContentThreeColumns sections={sections} setSections={setSections} sectionId={0} />
      }
    </>
  );
};

export default DisplayContent;
