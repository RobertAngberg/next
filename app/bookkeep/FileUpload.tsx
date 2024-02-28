"use client";

const FileUpload: React.FC<FileUploadProps> = ({ setFile, setPdfUrl }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files ? event.target.files[0] : null;
      setFile(file);

      if (file) {
        const fileType = file.type;
        const validImageTypes = ["image/jpeg", "image/png"];

        if (
          fileType === "application/pdf" ||
          validImageTypes.includes(fileType)
        ) {
          const fileUrl = URL.createObjectURL(file);
          setPdfUrl(fileUrl);
        } else {
          setPdfUrl(null);
          alert("Endast PDF, jpg- samt png-filer tillåts.");
        }
      } else {
        setPdfUrl(null);
      }
    }
  };

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
        className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        Välj fil
      </label>
    </>
  );
};

export default FileUpload;
