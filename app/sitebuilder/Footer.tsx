import React, { useState } from 'react';

function Footer() {
  const [isEditing, setIsEditing] = useState(false);
  const [footerText, setFooterText] = useState('Placeholder footer text');
  const [inputValue, setInputValue] = useState(footerText);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    setFooterText(inputValue);
    setIsEditing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <footer className="py-4 text-center bg-gray-200">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="px-2 py-1 border rounded"
          />
          <button
            onClick={handleSave}
            className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <p
          onClick={handleTextClick}
          className="cursor-pointer text-gray-700"
        >
          {footerText}
        </p>
      )}
    </footer>
  );
}

export default Footer;
