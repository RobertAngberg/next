"use client";

import React, { ChangeEvent, useState } from "react";
import AccountSearch from "./AccountSearch";
import FileUpload from "./FileUpload";
import InkomstUtgift from "./InkomstUtgift";
import Accounts from "./Accounts";
import Information from "./Information";
import TitleAndComment from "./TitleAndComment";
import useFetchPost from "./../hooks/useFetchPost";

// Fattar fortfarande inte await postFormData("http://localhost:3000/api", formData); men det funkar

const Bookkeep: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png"];

      if (
        fileType === "application/pdf" ||
        validImageTypes.includes(fileType)
      ) {
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl); // Assuming setFileUrl is the state setter function for handling the file URL
      } else {
        setPdfUrl(null);
        alert("Please upload a PDF or an image file.");
      }
    } else {
      setPdfUrl(null);
    }
  };

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

    await postFormData("http://localhost:3000/api", formData);
  };

  return (
    <div className="p-10 flex">
      <div className="w-1/4">
        {/* <form onSubmit={handleSubmit}> */}
        <FileUpload file={file} setFile={setFile} />

        <input
          type="file"
          accept="application/pdf,image/png,image/jpeg"
          onChange={handleFileChange}
        />

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
        <hr />
        <Information
          belopp={belopp}
          setBelopp={setBelopp}
          säljarensLand={säljarensLand}
          setSäljarensLand={setSäljarensLand}
          datum={datum}
          setDatum={setDatum}
        />
        <hr />
        <TitleAndComment
          titel={titel}
          setTitel={setTitel}
          kommentar={kommentar}
          setKommentar={setKommentar}
        />
        <button type="submit" className="button-bokför" onClick={handleSubmit}>
          Bokför
        </button>
        {/* </form> */}
      </div>
      <div className="w-4/5 ml-10">
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="PDF Viewer"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Bookkeep;

// "use client";
// import React, { useState, ChangeEvent } from "react";

// const PdfViewer: React.FC = () => {
// const [pdfUrl, setPdfUrl] = useState<string | null>(null);

// const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//   const file = event.target.files ? event.target.files[0] : null;

//   if (file && file.type === "application/pdf") {
//     const fileUrl = URL.createObjectURL(file);
//     setPdfUrl(fileUrl);
//   } else {
//     setPdfUrl(null);
//     alert("Please upload a PDF file.");
//   }
// };

//   return (
// <div>
//   <input type="file" accept="application/pdf" onChange={handleFileChange} />
//   {pdfUrl && (
//     <iframe
//       src={pdfUrl}
//       width="100%"
//       height="600px"
//       style={{ border: "none" }}
//       title="PDF Viewer"
//     ></iframe>
//   )}
// </div>
//   );
// };

// export default PdfViewer;
