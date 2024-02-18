"use client";

import React, { useState } from "react";
import AccountSearch from "./AccountSearch";
import FileUpload from "./FileUpload";
import InkomstUtgift from "./InkomstUtgift";
import Accounts from "./Accounts";
import Information from "./Information";
import TitleAndComment from "./TitleAndComment";
// import usePostData from "../../hooks/usePostData";

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

  // const { postBookkeepData } = usePostData();

  const handleSubmit = async () => {
    const dataToSend = {
      file,
      radioInkomstUtgift,
      searchText,
      konto1,
      konto2,
      konto3,
      belopp,
      säljarensLand,
      datum,
      titel,
      kommentar,
    };

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        // Handle the response
        const result = await response.json();
        console.log(result);
      } else {
        // Handle errors
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // await postBookkeepData(dataToSend);
  };

  return (
    <div className="p-10 flex">
      <div className="w-1/4">
        <FileUpload file={file} setFile={setFile} />
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
      </div>
      <div className="column-right">
        <p>--- Ladda upp ett underlag så visas det här ---</p>
      </div>
    </div>
  );
};

export default Bookkeep;
