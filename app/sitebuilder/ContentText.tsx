import { useState } from "react";

function ContentText({ handleAddContent }: ContentTextProps) {

  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      handleAddContent("text", inputValue);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your text"
        className="mr-2 p-2 border border-gray-300 rounded flex-grow"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>Add Text</button>
    </div>
  );
}

export default ContentText;
