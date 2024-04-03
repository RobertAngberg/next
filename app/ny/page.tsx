"use client";

import { useState } from "react";
import AccountSearch from "./AccountSearch";
import useFetchPost from "./../hooks/useFetchPost";
import FileUpload from "./FileUpload";
import Information from "./Information";
import TitleAndComment from "./TitleAndComment";

export default function Ny() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [searchText, setSearchText] = useState("");
  const [kontonummer, setKontonummer] = useState<number>(0);
  const [kontonamn, setKontonamn] = useState<string>();
  const [kontotyp, setKontotyp] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [företagskonto, setFöretagskonto] = useState("1930 - Företagskonto");
  const [belopp, setBelopp] = useState<number | undefined>(undefined);
  const [land, setLand] = useState("Sverige");
  const [datum, setDatum] = useState("");
  const [kommentar, setKommentar] = useState("");

  // Fattar fortfarande inte helt
  const postFormData = useFetchPost();

  const handleSubmit = async () => {
    const formData = new FormData();
    const datum10First = datum.slice(0, 10);

    const formFields = {
      fil: file || "",
      verifikationsdatum: datum10First,
      kontonummer,
      kontonamn,
      kontotyp,
      belopp,
      land,
      kommentar,
    };

    // Loopar igenom alla värden i formFields och lägger till dem i formData
    Object.entries(formFields).forEach(([key, value]) => {
      if (value instanceof File) {
        // Om det är en fil, lägg till filen i formData, tredje param är filens namn
        formData.append(key, value, value.name);
      } else {
        // Konverterar värdet till en sträng, detta om det är en siffra
        formData.append(key, value !== undefined ? String(value) : "");
      }
    });

    await postFormData("api/bookkeep/", formData);

    setCurrentStep(3);
  };

  return (
    <main className="items-center text-center bg-slate-950 min-h-screen pt-10">
      {currentStep === 1 && (
        <div className="w-full text-white md:mx-auto md:w-2/5 bg-cyan-950 p-10 rounded rounded-3xl">
          <AccountSearch
            searchText={searchText}
            setSearchText={setSearchText}
            setKontonummer={setKontonummer}
            setKontonamn={setKontonamn}
            setKontotyp={setKontotyp}
            setCurrentStep={setCurrentStep}
          />
        </div>
      )}
      {currentStep === 2 && (
        <main className="flex flex-col flex-col-reverse justify-center p-10 pt-0 text-white md:flex-row bg-slate-950 text-left">
          <div className="w-full mb-10 md:w-1/4 md:mb-0">
            <FileUpload
              file={file}
              setFile={setFile}
              setPdfUrl={setPdfUrl}
              setBelopp={setBelopp}
              setDatum={setDatum}
            />

            <Information
              belopp={belopp}
              setBelopp={setBelopp}
              land={land}
              setLand={setLand}
              datum={datum}
              setDatum={setDatum}
            />

            <TitleAndComment
              kommentar={kommentar}
              setKommentar={setKommentar}
            />

            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-6 font-bold text-white rounded bg-cyan-600 hover:bg-cyan-700"
              onClick={handleSubmit}
            >
              Bokför
            </button>
          </div>

          <div className="flex flex-col items-center w-full border md:w-2/4 md:ml-10 md:items-start">
            {/* Visa PDF */}
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                title="PDF Viewer"
              ></iframe>
            )}
            {/* Visa bild */}
            {file && <img src={URL.createObjectURL(file)} />}
          </div>
        </main>
      )}
      {/* /Tror  måste forcee lowercase steg 1, eller nåt */}
      {currentStep === 3 && (
        <main className="items-center text-center bg-slate-950 min-h-screen pt-10 text-white">
          <div className="w-full text-white md:mx-auto md:w-2/5 bg-cyan-950 p-10 rounded rounded-3xl text-left">
            <h1 className="text-2xl font-bold bokföring mb-4">
              Slutför bokföring
            </h1>
            <p className="w-full mb-4 md:w-1/4x">{kontonamn}</p>
            <p className="w-full mb-10 md:w-1/4 md:mb-0">{datum}</p>
            <table>
              <tr>
                <th>Konto</th>
                <th>Debet</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Kontodata</td>
                <td>Debetdata</td>
                <td>Kreditdata</td>
              </tr>
            </table>
          </div>
        </main>
      )}
    </main>
  );
}
