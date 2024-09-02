import React, { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function HeaderImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 0, // This will be set dynamically based on the image width
    height: 450, // Fixed height of 450px, but will adjust if image is shorter
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

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

      // Convert canvas to Blob and update the cropped image URL
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const croppedUrl = URL.createObjectURL(blob);
            setCroppedImageUrl(croppedUrl); // Store the cropped image URL separately
            setIsSaved(true); // Mark as saved
          }
        },
        "image/jpeg",
        1
      );
    }
  };

  return (
    <div className="relative -mx-6">
      {imageUrl && !croppedImageUrl ? (
        <>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            keepSelection={true} // Keep the selection fixed
            style={{ width: "100%" }} // Ensure the crop container takes full width
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
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={getCroppedImage}
              >
                Save Cropped Image
              </button>
            </div>
          )}
        </>
      ) : croppedImageUrl ? (
        <img src={croppedImageUrl} alt="Cropped Header" className="w-full h-auto object-cover" />
      ) : (
        <>
          <div className="w-full h-auto flex justify-center items-center border-2 border-dashed border-gray-300">
            <label className="cursor-pointer w-full h-full flex justify-center items-center">
              <span className="text-gray-500 p-6 hover:text-gray-400 transition duration-300">
                Ladda upp bild
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <div className="mt-6 pt-4 text-gray-500 text-center">
            <p>Rekommenderad bredd är minst 1200 pixlar.</p>
            <p>Bildens höjd kommer att beskäras till 450 pixlar.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default HeaderImage;
