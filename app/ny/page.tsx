"use client";

import { useState } from "react";
import AccountSearch from "./AccountSearch";
import Step2 from "./Step2";
import Step3 from "./Step3";

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

  console.log(currentStep);
  /* Tror  måste forcee lowercase steg 1, eller nåt */

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
      {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} />}
      {currentStep === 3 && <Step3 />}
    </main>
  );
}
