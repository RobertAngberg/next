import { useState } from "react";

function ContentHeader({ handleAddContent }: ContentHeaderProps) {
    
  const [inputValue, setInputValue] = useState("");

  // Den här skiten kan tas bort tror jag
  const handleAdd = () => {
    if (inputValue.trim()) {
      handleAddContent("header", inputValue);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your header"
        className="mr-2 p-2 border border-gray-300 rounded flex-grow"
      />
      <button className="bg-slate-700 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-slate-500" onClick={handleAdd}>Lägg till rubrik</button>
    </div>
  );
}

export default ContentHeader;
