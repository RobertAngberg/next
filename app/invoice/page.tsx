"use client";
import { jsPDF } from "jspdf";

import { useState, ChangeEvent, useRef } from "react";
import TextField from "./Textfield";
import ToggleButton from "./ToggleButton";
import InvoiceCanvas from "./InvoiceCanvas";
import LogoUpload from "./LogoUpload";

type Group =
  | "first4"
  | "second4"
  | "third4"
  | "fourth4"
  | "fifth4"
  | "sixth4"
  | "seventh4";

const Invoice: React.FC = () => {
  const [activeToggleBtn, setActiveToggleBtn] = useState<Group | null>(null);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfUrl, setPdfUrl] = useState("");

  const [textFields, setTextFields] = useState<{ [key: string]: string }>({
    // Vid input så ändras state, och skickas sen till InvoiceCanvas
    // <{ [key: string]: string }> = key/value
    Företagsnamn: "Testföretaget",
    Adress: "Testgatan 10",
    "Postnummer och stad": "123 45 Teststad",
    Telefonnummer: "Tel: 076123456",
    Bankgiro: "Bankgiro: 123-4567",
    "Företagsnamn, kund": "Kundföretaget",
    "Namn, kund": "Kund Kundsson",
    "Adress, kund": "Kundvägen 20",
    "Postnummer och stad, kund": "543 21 Kundstad",
    Fakturanummer: "12345",
    Kundnummer: "54321",
    Fakturadatum: "2021-08-10",
    Förfallodatum: "2021-09-10",
    Beskrivning: "Utfört arbete",
    Antal: "2",
    Apris: "400kr",
    Moms: "100kr",
    Belopp: "500kr",
    "Belopp före moms": "4000",
    "Moms totalt": "1000",
    "Summa att betala": "5000",
    "Fot, företagsnamn": "Testföretaget",
    "Fot, adress": "Testgatan 10",
    "Fot, postnummer och stad": "123 45 Teststad",
    "Fot, orgnummer": "Org.nr: 123456-7890",
    "Fot, momsnummer": "Momsnr: SE1234567890",
    "Fot, kontaktperson": "Testvald Testsson",
    "Fot, telefonnummer": "076123456",
    "Fot, email": "test@testmail.com",
    "Fot, hemsida": "www.testsidan.se",
    "Fot, social media": "Instagram.com/testföretaget",
  });

  const toggleButtons: { group: Group; text: string }[] = [
    { group: "first4", text: "Ändra din info" },
    { group: "second4", text: "Ändra kundens info" },
    { group: "third4", text: "Ändra fakturainfo" },
    { group: "fourth4", text: "Ändra transaktinfo" },
    { group: "fifth4", text: "Ändra totalinfo" },
    { group: "sixth4", text: "Ändra fot vänster" },
    { group: "seventh4", text: "Ändra fot höger" },
  ];

  const toggleVisibility = (group: Group) => {
    setActiveToggleBtn((prev) => (prev === group ? null : group));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTextFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (uploadedImage: HTMLImageElement) => {
    setLogoImage(uploadedImage);
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

  const saveAsPDF = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imageData, "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save("canvas-document.pdf");
    }
  };

  return (
    <main className="flex justify-center p-10 bg-slate-950 text-white">
      <div className="w-2/4">
        <InvoiceCanvas
          textFields={textFields}
          logoImage={logoImage}
          saveAsJPG={saveAsJPG}
          canvasRef={canvasRef}
        />
      </div>
      <div className="w-1/4 flex flex-col items-start">
        {toggleButtons.map((button, index) => (
          <div key={index}>
            <ToggleButton
              toggleGroup={button.group}
              buttonText={button.text}
              fieldGroupVisible={activeToggleBtn === button.group}
              onToggle={() => toggleVisibility(button.group)}
            />
            {activeToggleBtn === button.group &&
              Object.keys(textFields).map((labelText, fieldIndex) => {
                if (
                  (button.group === "first4" &&
                    fieldIndex >= 0 &&
                    fieldIndex < 5) ||
                  (button.group === "second4" &&
                    fieldIndex >= 5 &&
                    fieldIndex < 9) ||
                  (button.group === "third4" &&
                    fieldIndex >= 9 &&
                    fieldIndex < 13) ||
                  (button.group === "fourth4" &&
                    fieldIndex >= 13 &&
                    fieldIndex < 18) ||
                  (button.group === "fifth4" &&
                    fieldIndex >= 18 &&
                    fieldIndex < 21) ||
                  (button.group === "sixth4" &&
                    fieldIndex >= 21 &&
                    fieldIndex < 26) ||
                  (button.group === "seventh4" &&
                    fieldIndex >= 26 &&
                    fieldIndex < 31)
                ) {
                  return (
                    <TextField
                      key={labelText}
                      labelText={labelText}
                      textFields={textFields}
                      handleInputChange={handleInputChange}
                    />
                  );
                }
                return null;
              })}
          </div>
        ))}
        <br></br>
        <LogoUpload handleFileUpload={handleFileUpload} />
        <br></br>
        <button
          className="bg-yellow-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-4"
          onClick={saveAsJPG}
        >
          Spara som .jpg
        </button>

        <button
          className="bg-yellow-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-10"
          onClick={saveAsPDF}
        >
          Download as PDF
        </button>

        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%" // Adjusted for full height in modal
            title="PDF Viewer"
          ></iframe>
        )}
      </div>
    </main>
  );
};

export default Invoice;
