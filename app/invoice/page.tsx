"use client";

import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import TextField from "./Textfield";

type TextFields = {
  [key: string]: string;
};

const Invoice: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [textFields, setTextFields] = useState<TextFields>({
    Företagsnamn: "Testföretaget",
    Adress: "Testgatan 10",
    "Postnummer och stad": "123 45 Teststad",
    Telefonnummer: "Tel: 076123456",
    "Företagsnamn, kund": "Kundföretaget",
    "Namn, kund": "Kund Kundsson",
    "Adress, kund": "Kundvägen 20",
    "Postnummer och stad, kund": "543 21 Kundstad",
  });

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas
        ctx.font = "bold 48px Arial";
        ctx.fillText("Faktura", 40, 80);

        ctx.font = "bold 16px Arial";
        ctx.fillText(textFields.Företagsnamn, 80, 240);
        ctx.font = "16px Arial";
        ctx.fillText(textFields.Adress, 80, 260);
        ctx.fillText(textFields["Postnummer och stad"], 80, 280);
        ctx.fillText(textFields.Telefonnummer, 80, 300);

        ctx.font = "bold 16px Arial";
        ctx.fillText(textFields["Företagsnamn, kund"], 450, 240);
        ctx.font = "16px Arial";
        ctx.fillText(textFields["Namn, kund"], 450, 260);
        ctx.fillText(textFields["Adress, kund"], 450, 280);
        ctx.fillText(textFields["Postnummer och stad, kund"], 450, 300);
      }
    }
  }, [textFields]); // Redraw canvas on textFields change

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTextFields((prev) => ({ ...prev, [name]: value }));
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
    <main className="flex justify-center p-10 bg-slate-950 text-white">
      <div className="w-2/4">
        <canvas ref={canvasRef} width="730" height="900" className="bg-white" />
      </div>
      <div className="w-1/4 flex flex-col items-start">
        {Object.keys(textFields).map((labelText, index) => (
          <div className="w-full" key={labelText}>
            <TextField
              labelText={labelText}
              textFields={textFields}
              handleInputChange={handleInputChange}
            />
            {index === 3 && <div>asdf</div>}
          </div>
        ))}
        <br />
        <button
          className="bg-yellow-600 hover:bg-cyan-700 w-full text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-10"
          onClick={saveAsJPG}
        >
          Ladda ner som .jpg-fil
        </button>
      </div>
    </main>
  );
};

export default Invoice;
