"use client";

import React, { useEffect, useRef, useState } from "react";

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.font = "bold 40px Arial";
      ctx.fillText("Faktura", 40, 80); // Adjust position as needed
    }
  }, []);

  const addText = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && text) {
      ctx.font = "20px Arial";
      ctx.fillText(text, 50, 50); // Adjust position and style as needed
    }
  };

  const saveAsJPG = () => {
    if (canvasRef.current) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvasRef.current.width;
      tempCanvas.height = canvasRef.current.height;

      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.fillStyle = "#FFF"; // White background
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvasRef.current, 0, 0);

        const imageURL = tempCanvas.toDataURL("image/jpeg");
        const downloadLink = document.createElement("a");
        downloadLink.href = imageURL;
        downloadLink.download = "canvas-image.jpg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <main className="flex p-10 bg-slate-950 text-white m-auto">
      <div className="w-2/4">
        <canvas ref={canvasRef} width="700" height="900" className="bg-white" />
      </div>
      <div className="w-2/4">
        <label htmlFor="konto1">Rad 1: </label>
        <input
          className="w-full p-2 mb-2 border-solid border-2 border-gray-600 rounded-md text-black"
          type="text"
          id="konto1"
          name="konto1"
          value={text}
          placeholder="Enter text here"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-cyan-600 hover:bg-cyan-700 w-full text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-20"
          onClick={addText}
        >
          Add Text
        </button>
        <button
          className="bg-yellow-600 hover:bg-cyan-700 w-full text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-10"
          onClick={saveAsJPG}
        >
          Save as JPG
        </button>
      </div>
    </main>
  );
};

export default CanvasComponent;
