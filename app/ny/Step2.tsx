import { useState } from "react";
import FileUpload from "./FileUpload";
import Information from "./Information";
import TitleAndComment from "./TitleAndComment";

const Step2: React.FC<Step2Props> = ({ setCurrentStep }) => {
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

  function handleSubmit1() {
    setCurrentStep(3);
  }

  return (
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

        <TitleAndComment kommentar={kommentar} setKommentar={setKommentar} />

        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-6 font-bold text-white rounded bg-cyan-600 hover:bg-cyan-700"
          onClick={handleSubmit1}
        >
          Bokför
        </button>
      </div>

      {/* Visa PDF */}
      <div className="flex flex-col items-center w-full border md:w-2/4 md:ml-10 md:items-start">
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

export default Step2;
