"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Tesseract from "tesseract.js";
import { ChatGPTAPI } from "chatgpt";

const TextRecognition: React.FC<TextRecognitionProps> = ({
  setBelopp,
  setDatum,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    const chatGPT = async () => {
      if (recognizedText) {
        const apiKey = process.env.OPENAI_API_KEY || "";
        console.log(apiKey);
        const api = new ChatGPTAPI({
          apiKey: apiKey,
          fetch: self.fetch.bind(self),
        });

        const res = await api.sendMessage(
          `Please extract the datum and the summa or belopp from this text: ${recognizedText}.
          Make the date in format YYYY-MM-DD. Belopp must be only a number. Strip any trailing zeroes.
          Make it a JSON object with the keys "datum" and "belopp". 
          IMPORTANT: Give me ONLY the JSON object. DO NOT include any other text or information.
          The output MUST BE in the following format: {"datum": "YYYY-MM-DD", "belopp": "X"}`
        );

        const data = JSON.parse(res.text);
        setDatum(data.datum);
        setBelopp(data.belopp);
      }
    };

    chatGPT();
  }, [recognizedText]);

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        const result = await Tesseract.recognize(selectedImage, "swe");
        setRecognizedText(result.data.text);
      }
    };
    recognizeText();
  }, [selectedImage]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    setSelectedImage(image);
  };

  return (
    <div className="mb-10">
      <input
        type="file"
        id="asdf"
        accept="image/*"
        onChange={handleImageUpload}
        required
        style={{ display: "none" }}
      />
      <label
        htmlFor="asdf"
        className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        Välj fil
      </label>
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} />}
    </div>
  );
};

export default TextRecognition;
