type LogoUploadProps = {
  handleFileUpload: (image: HTMLImageElement) => void;
};

const LogoUpload: React.FC<LogoUploadProps> = ({ handleFileUpload }) => {
  const handleImageUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => handleFileUpload(img);
        // The image hasn't been "saved" or "handled" before the last line. 
        // The last line is what initiates the image loading process.
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        type="file"
        id="fileUpload"
        accept="image/png, image/jpeg"
        onChange={handleImageUploaded}
        style={{ display: "none" }}
      />
      <label
        htmlFor="fileUpload"
        className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
      >
        Upload Image
      </label>
    </>
  );
};

export default LogoUpload;
