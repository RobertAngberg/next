import React, { useEffect, useRef, useState } from "react";

const ImageResizer: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resizeWidth, setResizeWidth] = useState<number>(400);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());

  const sliderMin = 10;
  const sliderMax = 500;
  const stepSize = (sliderMax - sliderMin) / 10;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imgSrc = e.target?.result as string;
        setImageSrc(imgSrc);
        imageRef.current.src = imgSrc;
        imageRef.current.onload = () => {
          updateCanvas();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;

    if (canvas && ctx && img) {
      // Calculate aspect ratio
      const aspectRatio = img.width / img.height;

      // Calculate new dimensions
      let newWidth = resizeWidth;
      let newHeight = newWidth / aspectRatio;

      // Adjust width and height based on the maximum dimensions
      if (newWidth > 500 || newHeight > 350) {
        if (aspectRatio >= 1) {
          // Image is wider than it is tall
          newWidth = 500;
          newHeight = newWidth / aspectRatio;
        } else {
          // Image is taller than it is wide
          newHeight = 350;
          newWidth = newHeight * aspectRatio;
        }
      }

      // Update canvas size and draw the image
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
    }
  };

  useEffect(() => {
    updateCanvas();
  }, [resizeWidth]);

  const handleResize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResizeWidth(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {!imageSrc && (
        <>
          <input
            type="file"
            id="fileUpload"
            accept="application/pdf,image/png,image/jpeg"
            onChange={handleImageUpload}
            required
            style={{ display: "none" }}
          />
          <label
            htmlFor="fileUpload"
            className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
          >
            Välj fil
          </label>
        </>
      )}
      {imageSrc && (
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={stepSize}
          value={resizeWidth}
          onChange={handleResize}
          className="absolute bottom-10 w-1/4"
        />
      )}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageResizer;
