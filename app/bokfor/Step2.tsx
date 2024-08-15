import { FileUpload } from "./FileUpload";
import { Information } from "./Information";
import { Comment } from "./Comment";

function Step2({
  setCurrentStep,
  fil,
  setFil,
  pdfUrl,
  setPdfUrl,
  belopp,
  setBelopp,
  transaktionsdatum,
  setTransaktionsdatum,
  kommentar,
  setKommentar,
}: Step2Props) {
  const handleSubmit1 = () => {
    setCurrentStep(3);
  };

  return (
    <main className="flex flex-col flex-col-reverse justify-center p-10 pt-0 text-white md:flex-row bg-slate-950 text-left">
      <div className="w-full mb-10 md:w-1/4 md:mb-0">
        <FileUpload
          fil={fil}
          setFil={setFil}
          setPdfUrl={setPdfUrl}
          setBelopp={setBelopp}
          setTransaktionsdatum={setTransaktionsdatum}
        />

        <Information
          belopp={belopp}
          setBelopp={setBelopp}
          transaktionsdatum={transaktionsdatum}
          setTransaktionsdatum={setTransaktionsdatum}
        />

        <Comment kommentar={kommentar} setKommentar={setKommentar} />

        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-6 font-bold text-white rounded bg-cyan-600 hover:bg-cyan-700"
          onClick={handleSubmit1}
        >
          Bokför
        </button>
      </div>

      <div className="flex flex-col items-center w-full border md:w-2/4 md:ml-10 md:items-start">
        {/* Visa PDF */}
        {pdfUrl && <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer"></iframe>}

        {/* Visa bild */}
        {fil && <img src={URL.createObjectURL(fil)} />}
      </div>
    </main>
  );
}

export { Step2 };
