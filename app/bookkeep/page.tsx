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
  const [konto1, setKonto1] = useState("1930 - Företagskonto");
  const [konto2, setKonto2] = useState("");
  const [konto3, setKonto3] = useState("");
  const [belopp, setBelopp] = useState("");
  const [säljarensLand, setSäljarensLand] = useState("Sverige");
  const [datum, setDatum] = useState("");
  const [titel, setTitel] = useState("");
  const [kommentar, setKommentar] = useState("");

  // Fattar fortfarande inte helt
  const postFormData = useFetchPost();

  const handleSubmit = async () => {
    const formData = new FormData();

    const formFields = {
      file: file || "",
      radioInkomstUtgift,
      konto1,
      konto2,
      konto3,
      belopp,
      säljarensLand,
      datum,
      titel,
      kommentar,
    };
    // Loop over the object and append each field to formData
    Object.entries(formFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await postFormData("http://localhost:3000/api/bookkeep/", formData);
  };

  return (
    <main className="p-10 flex items-center p-10 text-center bg-slate-950 text-white">
      <div className="w-1/4">
        <FileUpload setFile={setFile} setPdfUrl={setPdfUrl} />

        <InkomstUtgift
          radioInkomstUtgift={radioInkomstUtgift}
          setRadioInkomstUtgift={setRadioInkomstUtgift}
        />

        <AccountSearch
          radio={radioInkomstUtgift}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <Accounts
          konto1={konto1}
          setKonto1={setKonto1}
          konto2={konto2}
          setKonto2={setKonto2}
          konto3={konto3}
          setKonto3={setKonto3}
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
          className="bg-cyan-600 hover:bg-cyan-700 w-full text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          onClick={handleSubmit}
        >
          Bokför
        </button>
      </div>
      <div className="w-3/4 ml-10">
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="100%"
            height="1000px"
            title="PDF Viewer"
          ></iframe>
        )}
      </div>
    </main>
  );
};

export default Bookkeep;
