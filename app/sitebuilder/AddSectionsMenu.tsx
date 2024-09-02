function AddSectionsMenu({ handleButtonClick }: AddSectionsMenuProps) {
  return (
    <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2">
      <div className="flex space-x-2 bg-gray-600 p-2 rounded-lg mt-3">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => handleButtonClick("header")}
        >
          Rubrik
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => handleButtonClick("text")}
        >
          Text
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => handleButtonClick("image")}
        >
          Bild
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => handleButtonClick("twoColumns")}
        >
          Två kolumner
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-500"
          onClick={() => handleButtonClick("threeColumns")}
        >
          Tre kolumner
        </button>
      </div>
    </div>
  );
}

export default AddSectionsMenu;
