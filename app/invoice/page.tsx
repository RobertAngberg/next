"use client";

import { useState, ChangeEvent } from "react";
import TextField from "./Textfield";
import ToggleButton from "./ToggleButton";
import InvoiceCanvas from "./InvoiceCanvas";
import Modal from "./Modal";
import ImageResizer from "./LogoUpload";

type Group =
  | "first4"
  | "second4"
  | "third4"
  | "fourth4"
  | "fifth4"
  | "sixth4"
  | "seventh4";

const Invoice: React.FC = () => {
  const [first4Visible, setFirst4Visible] = useState(false);
  const [second4Visible, setSecond4Visible] = useState(false);
  const [third4Visible, setThird4Visible] = useState(false);
  const [fourth4Visible, setFourth4Visible] = useState(false);
  const [fifth4Visible, setFifth4Visible] = useState(false);
  const [sixth4Visible, setSixth4Visible] = useState(false);
  const [seventh4Visible, setSeventh4Visible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Vid input så ändras state, och skickas sen till InvoiceCanvas
  // <{ [key: string]: string }> = key/value
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

  // Array med objekt med "mall" för att skapa toggleknappar
  const toggleButtons: { group: Group; text: string; visible: boolean }[] = [
    { group: "first4", text: "Ändra din info", visible: first4Visible },
    { group: "second4", text: "Ändra kundens info", visible: second4Visible },
    { group: "third4", text: "Ändra fakturainfo", visible: third4Visible },
    { group: "fourth4", text: "Ändra transaktinfo", visible: fourth4Visible },
    { group: "fifth4", text: "Ändra totalinfo", visible: fifth4Visible },
    { group: "sixth4", text: "Ändra fot vänster", visible: sixth4Visible },
    { group: "seventh4", text: "Ändra fot höger", visible: seventh4Visible },
  ];

  // Knyter group names till respektive stateSet func
  // Key är group name och value är stateSet func
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

  return (
    <main className="flex justify-center p-10 bg-slate-950 text-white">
      <div className="w-2/4">
        <InvoiceCanvas textFields={textFields} />
      </div>
      <div className="w-1/4 flex flex-col items-start">
        {toggleButtons.map((button, index) => (
          <ToggleButton
            key={index}
            toggleGroup={button.group}
            buttonText={button.text}
            isVisible={button.visible}
            onToggle={toggleVisibility}
          />
        ))}

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

        {/* <button
          className="bg-yellow-600 hover:bg-cyan-700 w-full text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-10"
          onClick={toggleModal}
        >
          Open Modal
        </button>
        <Modal isModalOpen={isModalOpen} onClose={toggleModal} /> */}
        <ImageResizer />
      </div>
    </main>
  );
};

export default Invoice;
