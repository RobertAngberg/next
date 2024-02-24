import React, { useEffect, useRef, useState } from "react";

const ImageResizer: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resizeWidth, setResizeWidth] = useState<number>(1000);
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
      canvas.width = resizeWidth;
      canvas.height = (img.height / img.width) * resizeWidth;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    updateCanvas();
  }, [resizeWidth]);

  const handleResize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResizeWidth(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center w-3/4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {imageSrc && (
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={stepSize}
          value={resizeWidth}
          onChange={handleResize}
          className="mb-4 w-1/4" // Tailwind doesn't support custom width directly, you might need to add a custom class in your CSS
        />
      )}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageResizer;
