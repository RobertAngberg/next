import React, { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import placeholderImage from "./placeholder.jpg";

function HeaderImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 0, // This will be set dynamically based on the image width
    height: 450, // Fixed height of 450px, but will adjust if the image is shorter
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if the text is being edited
  const [uploadText, setUploadText] = useState("Stadens bästa kakor"); // Editable text state
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setCroppedImageUrl(null); // Reset cropped image on new upload
        setIsSaved(false); // Reset save state on new upload
        setCrop((prevCrop) => ({
          ...prevCrop,
          width: 0, // Reset width; it will be set dynamically after image load
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageLoaded = (image: HTMLImageElement) => {
    imageRef.current = image;

    const imageWidth = image.width;
    const imageHeight = image.height;

    const newCrop: Crop = {
      unit: "px",
      width: imageWidth, // Full width of the image
      height: Math.min(450, imageHeight), // Adjust height: 450px max, or image height if shorter
      x: 0,
      y: 0, // No need to center if height is less than 450px
    };

    setCrop(newCrop);

    // Trigger the completion to set the initial completedCrop
    setCompletedCrop({
      unit: "px",
      width: newCrop.width,
      height: newCrop.height,
      x: newCrop.x,
      y: newCrop.y,
    });
  };

  const getCroppedImage = () => {
    if (!completedCrop || !imageRef.current) {
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    canvas.width = completedCrop.width! * scaleX;
    canvas.height = completedCrop.height! * scaleY;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
      ctx.drawImage(
        imageRef.current,
        completedCrop.x! * scaleX,
        completedCrop.y! * scaleY,
        completedCrop.width! * scaleX,
        completedCrop.height! * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Convert canvas to Blob and update the cropped image URL as PNG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const croppedUrl = URL.createObjectURL(blob);
            setCroppedImageUrl(croppedUrl); // Store the cropped image URL separately
            setIsSaved(true); // Mark as saved
            setUploadText("Stadens bästa kakor"); // Ensure the text remains visible after uploading
          }
        },
        "image/png", // Save as PNG to preserve transparency
        1
      );
    }
  };

  const triggerFileUpload = () => {
    // Reset the current image and crop state
    setImageUrl(null);
    setCroppedImageUrl(null);
    setIsSaved(false);

    // Trigger the file input click to allow the user to upload a new image
    fileInputRef.current?.click();
  };

  const handleTextClick = () => {
    setIsEditing(true); // Enable editing mode
    setUploadText(""); // Clear the text to show a marker
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadText(event.target.value); // Update the text state
  };

  const handleTextSave = () => {
    if (uploadText.trim() === "") {
      setUploadText("Stadens bästa kakor"); // Reset to default text if input is empty
    }
    setIsEditing(false); // Disable editing mode
    setIsSaved(true); // Show the save button
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleTextSave(); // Save text on Enter key press
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Set hover state to true
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Set hover state to false
  };

  return (
    <div className="relative -mx-6">
      {imageUrl && !croppedImageUrl ? (
        <>
          <div className="text-gray-500 text-center mt-6 pt-4">
            <p>Rekommenderad bredd är minst 1200 pixlar.</p>
            <p>Bildens höjd kommer att beskäras till 450 pixlar.</p>
          </div>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            keepSelection={true} // Keep the selection fixed
            style={{ width: "100%", marginTop: "20px" }} // Ensure the crop container takes full width
          >
            <img
              src={imageUrl}
              alt="Header"
              ref={imageRef}
              onLoad={(e) => handleImageLoaded(e.currentTarget)}
              className="w-full h-auto object-cover"
            />
          </ReactCrop>
          {!isSaved && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={getCroppedImage}
              >
                Spara beskuren bild
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={triggerFileUpload}
              >
                Byt bild
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className={`w-full h-auto flex justify-center items-center relative transition duration-300 ${
              isHovered ? "bg-white bg-opacity-50" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={croppedImageUrl ? croppedImageUrl : placeholderImage.src} // Use cropped image or placeholder
              alt="Placeholder"
              className="w-full h-auto object-cover"
            />
            <label className="absolute cursor-pointer w-full h-full flex flex-col justify-center items-center">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={uploadText}
                    onChange={handleTextChange}
                    onBlur={handleTextSave}
                    onKeyDown={handleKeyDown}
                    placeholder=""
                    className="text-white text-5xl font-bold text-center bg-transparent border-none focus:outline-none"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }} // Added text shadow
                  />
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleTextSave}
                  >
                    Spara text
                  </button>
                </>
              ) : (
                <span
                  className="text-white text-5xl font-bold hover:text-gray-300 transition duration-300"
                  onClick={handleTextClick}
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }} // Added text shadow
                >
                  {uploadText}
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default HeaderImage;
