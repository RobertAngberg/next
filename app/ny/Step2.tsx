import FileUpload from "./FileUpload";
import Information from "./Information";
import Comment from "./Comment";

const Step2: React.FC<Step2Props> = ({
  setCurrentStep,
  file,
  setFile,
  pdfUrl,
  setPdfUrl,
  belopp,
  setBelopp,
  land,
  setLand,
  datum,
  setDatum,
  kommentar,
  setKommentar,
}) => {
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

        <Comment kommentar={kommentar} setKommentar={setKommentar} />

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
