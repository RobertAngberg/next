"use client";

type FileUploadProps = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  return (
    <>
      <input
        type="file"
        id="fileUpload"
        onChange={handleFileChange}
        accept=".pdf, .jpg, .jpeg, .png"
        required
        style={{ display: "none" }}
      />
      <label
        htmlFor="fileUpload"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        Välj fil
      </label>

      {file && <p>Selected file: {file.name}</p>}
    </>
  );
};

export default FileUpload;
