"use client";

import React, { useState } from "react";
import AccountSearch from "./AccountSearch";
import FileUpload from "./FileUpload";
import InkomstUtgift from "./InkomstUtgift";
import Accounts from "./Accounts";
import Information from "./Information";
import TitleAndComment from "./TitleAndComment";
import useFetchPost from "./../hooks/useFetchPost";

const Bookkeep: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [radioInkomstUtgift, setRadioInkomstUtgift] = useState("");
  const [searchText, setSearchText] = useState("");
  const [företagsKonto, setFöretagsKonto] = useState<string>(
    "1930 - Företagskonto"
  );
  const [motkonto, setMotkonto] = useState<string | undefined>(undefined);
  const [momsKonto, setMomsKonto] = useState<string | undefined>(undefined);
  const [belopp, setBelopp] = useState<number | undefined>(undefined);
  const [land, setLand] = useState("Sverige");
  const [datum, setDatum] = useState("");
  const [kommentar, setKommentar] = useState("");

  // Fattar fortfarande inte helt
  const postFormData = useFetchPost();

  const handleSubmit = async () => {
    const formData = new FormData();
    const datum10First = typeof datum === "string" ? datum.slice(0, 10) : datum;

    const formFields = {
      fil: file || "",
      verifikationsdatum: datum10First,
      radioInkomstUtgift,
      företagsKonto,
      motkonto,
      momsKonto,
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
  };

  return (
    <main className="flex flex-col flex-col-reverse justify-center p-10 text-white md:flex-row bg-slate-950">
      <div className="w-full mb-10 md:w-1/4 md:mb-0 md:items-center md:justify-center">
        <FileUpload
          file={file}
          setFile={setFile}
          setPdfUrl={setPdfUrl}
          setBelopp={setBelopp}
          setDatum={setDatum}
        />

        <InkomstUtgift
          radioInkomstUtgift={radioInkomstUtgift}
          setRadioInkomstUtgift={setRadioInkomstUtgift}
        />

        <AccountSearch
          radioInkomstUtgift={radioInkomstUtgift}
          searchText={searchText}
          setSearchText={setSearchText}
          setMotkonto={setMotkonto}
        />

        <Accounts
          företagsKonto={företagsKonto}
          setFöretagsKonto={setFöretagsKonto}
          motkonto={motkonto}
          setMotkonto={setMotkonto}
          momsKonto={momsKonto}
          setMomsKonto={setMomsKonto}
          radioInkomstUtgift={radioInkomstUtgift}
        />

        <hr className="my-8" />

        <Information
          belopp={belopp}
          setBelopp={setBelopp}
          land={land}
          setLand={setLand}
          datum={datum}
          setDatum={setDatum}
        />

        <hr className="my-8" />

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
      <div className="flex flex-col items-center w-full border md:w-3/4 md:ml-10 md:items-start">
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
  );
};

export default Bookkeep;
