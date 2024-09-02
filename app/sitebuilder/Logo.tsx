import { useState } from "react";

function Logo() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadedImage(reader.result as string); // Save the uploaded image
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center md:ml-4">
      {uploadedImage ? (
        <img
          src={uploadedImage}
          alt="Logo"
          className="w-36 h-16 mr-4 cursor-pointer object-contain" // Set max width to 144px and max height to 64px
          onClick={() => document.getElementById("logo-upload")?.click()} // Trigger file input click
        />
      ) : (
        <div className="ml-4">
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-blue-400 whitespace-nowrap">
            Ladda upp logo
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      )}

      {/* Hidden input for uploading new logo */}
      {uploadedImage && (
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      )}
    </div>
  );
}

export { Logo };
