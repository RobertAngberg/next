"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import TextField from "./Textfield";
import ToggleButton from "./ToggleButton";
import ImageResizer from "./ImageResizer";

const Invoice: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [first4Visible, setFirst4Visible] = useState(false);
  const [second4Visible, setSecond4Visible] = useState(false);
  const [third4Visible, setThird4Visible] = useState(false);
  const [fourth4Visible, setFourth4Visible] = useState(false);
  const [fifth4Visible, setFifth4Visible] = useState(false);
  const [sixth4Visible, setSixth4Visible] = useState(false);
  const [seventh4Visible, setSeventh4Visible] = useState(false);

  // [key: string]: string - är "key: value"
  const [textFields, setTextFields] = useState<{ [key: string]: string }>({
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

  const toggleVisibility = (group: string) => {
    const visibilitySetters: {
      [key: string]: React.Dispatch<React.SetStateAction<boolean>>;
    } = {
      first4: setFirst4Visible,
      second4: setSecond4Visible,
      third4: setThird4Visible,
      fourth4: setFourth4Visible,
      fifth4: setFifth4Visible,
      sixth4: setSixth4Visible,
      seventh4: setSeventh4Visible,
    };

    const setter = visibilitySetters[group];
    if (setter) {
      setter((prev) => !prev);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTextFields((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas
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

        // FotFöretagsnamn: "Testföretaget",
        // FotAdress: "Testgatan 10",
        // FotPostnummerStad: "123 45 Teststad",
        // FotOrgNummer: "123456-7890",
        // FotFotMomsnummer: "SE1234567890",
        // FotPerson: "Testvald Testsson",
        // FotTelefonnummer: "076123456",
        // FotEmail: "test@testmail.com",
        // FotURL: "www.testsidan.se",
        // Fot: "Instagram.com/testföretaget",

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
  }, [textFields]);

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
        <ToggleButton
          toggleGroup="first4"
          buttonText="Ändra din info"
          isVisible={first4Visible}
          onToggle={toggleVisibility}
        />
        <ToggleButton
          toggleGroup="second4"
          buttonText="Ändra kundens info"
          isVisible={second4Visible}
          onToggle={toggleVisibility}
        />
        <ToggleButton
          toggleGroup="third4"
          buttonText="Ändra fakturainfo"
          isVisible={third4Visible}
          onToggle={toggleVisibility}
        />
        <ToggleButton
          toggleGroup="fourth4"
          buttonText="Ändra transaktionsinfo"
          isVisible={fourth4Visible}
          onToggle={toggleVisibility}
        />
        <ToggleButton
          toggleGroup="fifth4"
          buttonText="Ändra totalinfo"
          isVisible={fifth4Visible}
          onToggle={toggleVisibility}
        />
        <ToggleButton
          toggleGroup="sixth4"
          buttonText="Ändra fot vänster"
          isVisible={sixth4Visible}
          onToggle={toggleVisibility}
        />
        <ToggleButton
          toggleGroup="seventh4"
          buttonText="Ändra fot höger"
          isVisible={seventh4Visible}
          onToggle={toggleVisibility}
        />

        {Object.keys(textFields).map((labelText, index) => (
          <div key={labelText}>
            {((index >= 0 && index < 5 && first4Visible) ||
              (index >= 5 && index < 9 && second4Visible) ||
              (index >= 9 && index < 13 && third4Visible) ||
              (index >= 13 && index < 18 && fourth4Visible) ||
              (index >= 18 && index < 21 && fifth4Visible) ||
              (index >= 21 && index < 26 && sixth4Visible) ||
              (index >= 26 && index < 31 && seventh4Visible) ||
              index >= 31) && (
              <TextField
                labelText={labelText}
                textFields={textFields}
                handleInputChange={handleInputChange}
              />
            )}
          </div>
        ))}
        <br />
        <button
          className="bg-yellow-600 hover:bg-cyan-700 w-full text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-10"
          onClick={saveAsJPG}
        >
          Ladda ner som .jpg-fil
        </button>

        <ImageResizer />
      </div>
    </main>
  );
};

export default Invoice;
