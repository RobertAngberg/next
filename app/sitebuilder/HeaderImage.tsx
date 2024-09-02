import React, { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function HeaderImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 50,
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
        setIsSaved(false); // Reset save state on new upload
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageLoaded = (image: HTMLImageElement) => {
    imageRef.current = image;
  };

  const getCroppedImage = () => {
    if (!completedCrop || !imageRef.current) {
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    // Set canvas dimensions to the size of the cropped area
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

      // Convert canvas to Blob and update the image URL
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob);
          setImageUrl(croppedImageUrl); // Update the image URL with the cropped image
          setIsSaved(true); // Mark as saved
        }
      }, "image/jpeg", 1);
    }
  };

  return (
    <div className="relative -mx-6">
      {imageUrl ? (
        <>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1200 / 500} // Aspect ratio to maintain height focus
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
      ) : (
        <>
          <div className="w-full h-auto flex justify-center items-center border-2 border-dashed border-gray-300">
            <label className="cursor-pointer w-full h-full flex justify-center items-center">
              <span className="text-gray-500 p-6">Ladda upp bild</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="mt-2 text-gray-500">
            Rekommenderad bredd är minst 1200 pixlar.
          </div>
        </>
      )}
    </div>
  );
}

export default HeaderImage;
