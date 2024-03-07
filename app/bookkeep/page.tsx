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
  const [företagsKonto, setFöretagsKonto] = useState<number>(1930);
  const [motkonto, setMotkonto] = useState<number | undefined>(undefined);
  const [momsKonto, setMomsKonto] = useState<number | undefined>(undefined);
  const [belopp, setBelopp] = useState<number | undefined>(undefined);
  const [säljarensLand, setSäljarensLand] = useState("Sverige");
  const [datum, setDatum] = useState("");
  const [titel, setTitel] = useState("");
  const [kommentar, setKommentar] = useState("");

  // Fattar fortfarande inte helt
  const postFormData = useFetchPost();

  const handleSubmit = async () => {
    const formData = new FormData();

    const formFields = {
      imageFile: file || "",
      radioInkomstUtgift,
      företagsKonto,
      motkonto,
      momsKonto,
      belopp,
      säljarensLand,
      datum,
      titel,
      kommentar,
    };

    // Här ska gå att ta bort igen............
    // Loopar igenom alla värden i formFields och lägger till dem i formData
    Object.entries(formFields).forEach(([key, value]) => {
      if (value instanceof File) {
        // Om värdet är en fil så används File overload av FormData.append
        formData.append(key, value, value.name);
      } else {
        // Konverterar värdet till en sträng, detta om det är en siffra
        formData.append(key, String(value));
      }
    });

    await postFormData("api/bookkeep/", formData);
  };

  return (
    <main className="flex justify-center p-10 bg-slate-950 text-white">
      <div className="w-1/4 items-center justify-center">
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
          säljarensLand={säljarensLand}
          setSäljarensLand={setSäljarensLand}
          datum={datum}
          setDatum={setDatum}
        />

        <hr className="my-8" />

        <TitleAndComment
          titel={titel}
          setTitel={setTitel}
          kommentar={kommentar}
          setKommentar={setKommentar}
        />

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 w-full text-white font-bold py-6 px-4 rounded flex items-center justify-center"
          onClick={handleSubmit}
        >
          Bokför
        </button>
      </div>
      <div className="w-3/4 ml-10 flex flex-col items-start border">
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
