"use client";

import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { ChatGPTAPI } from "chatgpt";

const FileUpload: React.FC<FileUploadProps> = ({
  setFil,
  setPdfUrl,
  setTransaktionsdatum,
  setBelopp,
  fil,
}) => {
  const [recognizedText, setRecognizedText] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files ? event.target.files[0] : null;

      // PDF
      if (file && file.type === "application/pdf") {
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);

        // Bild
      } else if (
        file &&
        (file.type === "image/jpeg" || file.type === "image/png")
      ) {
        setFil(file);
      }
    }
  };

  useEffect(() => {
    const scanImage = async () => {
      if (fil) {
        const result = await Tesseract.recognize(fil, "swe");
        setRecognizedText(result.data.text);
      }
    };
    scanImage();
  }, [fil]);

  useEffect(() => {
    const chatGPT = async () => {
      if (recognizedText) {
        const apiKey = process.env.OPENAI_API_KEY || "";
        const ChatGPTApi = new ChatGPTAPI({
          apiKey: apiKey,
          fetch: self.fetch.bind(self),
        });

        const res = await ChatGPTApi.sendMessage(
          `Please extract the datum and the summa or belopp from this text: ${recognizedText}.
          Make the date in format YYYY-MM-DD. Belopp must be only a number. Strip any trailing zeroes.
          Make it a JSON object with the keys "datum" and "belopp". 
          IMPORTANT: Give me ONLY the JSON object. DO NOT include any other text or information.
          The output MUST BE in the following format: {"datum": "YYYY-MM-DD", "belopp": "X"}`
        );

        const data = JSON.parse(res.text);

        // Validate and set datum
        const parsedDate = new Date(data.datum);

        if (!isNaN(parsedDate.getTime())) {
          setTransaktionsdatum(data.datum);
        } else {
          setTransaktionsdatum("");
        }

        // Validate and set belopp
        if (!isNaN(parseFloat(data.belopp))) {
          setBelopp(data.belopp);
        } else {
          setBelopp(0);
        }
      }
    };

    chatGPT();
  }, [recognizedText]);

  return (
    <>
      <input
        type="file"
        id="fileUpload"
        accept="application/pdf,image/png,image/jpeg"
        onChange={handleFileChange}
        required
        style={{ display: "none" }}
      />
      <label
        htmlFor="fileUpload"
        className="flex items-center justify-center px-4 py-2 font-bold text-white rounded cursor-pointer bg-cyan-600 hover:bg-cyan-700 mb-6"
      >
        Välj fil
      </label>
    </>
  );
};

export default FileUpload;
