"use client";

import React, { useRef, useEffect, useState } from "react";
import LogoUpload from "./LogoUpload";

type TextFields = { [key: string]: string };

const InvoiceCanvas = ({ textFields }: { textFields: TextFields }) => {
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (image) {
          // Här sätts maxhöjd och maxbredd för loggan
          let scale = Math.min(200 / image.width, 125 / image.height);
          let width = image.width * scale;
          let height = image.height * scale;
          let x = canvasRef.current.width - width;
          // x - 30 är 30px padding från högerkanten.. + 5 padding från toppen
          ctx.drawImage(image, x - 30, 30 + 5, width, height);
        }

        ctx.font = "bold 48px Arial";
        ctx.fillStyle = "#222"; // Reset fillStyle, för textfärg
        ctx.fillText("Faktura", 40, 100);

        // Uppgifter, egna företaget
        ctx.font = "bold 16px Arial";
        ctx.fillText(textFields.Företagsnamn, 40, 200);
        ctx.font = "16px Arial";
        ctx.fillText(textFields.Adress, 40, 220);
        ctx.fillText(textFields["Postnummer och stad"], 40, 240);
        ctx.fillText(textFields.Telefonnummer, 40, 260);
        ctx.font = "bold 16px Arial";
        ctx.fillText(textFields.Bankgiro, 40, 300);

        // Uppgifter, kunden
        ctx.font = "bold 16px Arial";
        ctx.fillText(textFields["Företagsnamn, kund"], 400, 200);
        ctx.font = "16px Arial";
        ctx.fillText(textFields["Namn, kund"], 400, 220);
        ctx.fillText(textFields["Adress, kund"], 400, 240);
        ctx.fillText(textFields["Postnummer och stad, kund"], 400, 260);

        // Betalningsuppgifter, headers
        ctx.font = "bold 16px Arial";
        ctx.fillText("Fakturanummer", 40, 380);
        ctx.fillText("Kundnummer", 180, 380);
        ctx.fillText("Fakturadatum", 320, 380);
        ctx.fillText("Förfallodatum", 480, 380);

        // Betalningsuppgifter, info
        ctx.font = "16px Arial";
        ctx.fillText(textFields["Fakturanummer"], 40, 410);
        ctx.fillText(textFields["Kundnummer"], 180, 410);
        ctx.fillText(textFields["Fakturadatum"], 320, 410);
        ctx.fillText(textFields["Förfallodatum"], 480, 410);

        // Transaktionen
        const tableStartX = 40;
        const tableStartY = 500;
        const columnWidth = 130;
        const rowHeight = 25;
        const headerHeight = rowHeight * 2 - 10;

        const headers = ["Beskr.", "Antal", "Á pris", "Moms", "Belopp"];

        // Header bakgrund
        ctx.fillStyle = "#CCC";
        headers.forEach((_, index) => {
          ctx.fillRect(
            tableStartX + columnWidth * index,
            tableStartY - headerHeight,
            columnWidth,
            headerHeight
          );
        });

        // Header text
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#222"; // Reset fillStyle, för textfärg
        ctx.textBaseline = "middle";
        headers.forEach((header, index) => {
          const textX = tableStartX + columnWidth * index + 20;
          const textY = tableStartY - headerHeight / 2; // Centrera vertical
          ctx.fillText(header, textX, textY);
        });

        // Transaktionsdata
        ctx.font = "16px Arial";
        ctx.fillText(textFields["Beskrivning"], 40, 520);
        ctx.fillText(textFields["Antal"], 190, 520);
        ctx.fillText(textFields["Apris"], 320, 520);
        ctx.fillText(textFields["Moms"], 450, 520);
        ctx.fillText(textFields["Belopp"], 580, 520);

        // Totaler
        ctx.font = "16px Arial";
        ctx.fillText("Belopp före moms:", 40, 600);
        ctx.fillText("Moms totalt:", 40, 630);
        ctx.fillText("Summa att betala:", 40, 670);

        ctx.fillText(textFields["Belopp före moms"], 220, 600);
        ctx.fillText(textFields["Moms totalt"], 220, 630);
        ctx.font = "bold 20px Arial";
        ctx.fillText(textFields["Summa att betala"], 220, 670);

        // Fot kolumn 1
        ctx.font = "11px Arial";
        ctx.fillText(textFields["Fot, företagsnamn"], 40, 760);
        ctx.fillText(textFields["Fot, adress"], 40, 780);
        ctx.fillText(textFields["Fot, postnummer och stad"], 40, 800);
        ctx.fillText(textFields["Fot, orgnummer"], 40, 820);
        ctx.fillText(textFields["Fot, momsnummer"], 40, 840);

        // Fot kolumn 2
        ctx.fillText(textFields["Fot, kontaktperson"], 560, 760);
        ctx.fillText(textFields["Fot, telefonnummer"], 560, 780);
        ctx.fillText(textFields["Fot, email"], 560, 800);
        ctx.fillText(textFields["Fot, hemsida"], 560, 820);
        ctx.fillText(textFields["Fot, social media"], 560, 840);
      }
    }
  }, [textFields, image]);

  const handleFileUpload = (image: HTMLImageElement) => {
    setImage(image);
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
    <>
      <LogoUpload handleFileUpload={handleFileUpload} />
      <br></br>
      <br></br>
      <canvas ref={canvasRef} width="730" height="900" className="bg-white" />
      <button
        className="bg-yellow-600 hover:bg-cyan-700 w-full text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-10"
        onClick={saveAsJPG}
      >
        Save as JPG
      </button>
    </>
  );
};

export default InvoiceCanvas;
