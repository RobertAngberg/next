import React from "react";

type TextFields = {
  [key: string]: string;
};

type InputComponentProps = {
  labelText: string;
  textFields: TextFields;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField: React.FC<InputComponentProps> = ({
  labelText,
  textFields,
  handleInputChange,
}) => {
  return (
    <div key={labelText} className="w-full">
      <label htmlFor={labelText}>{labelText}:</label>
      <input
        className="w-full p-2 mb-2 mt-2 border-solid border-2 border-gray-600 rounded-md text-black"
        type="text"
        id={labelText}
        value={textFields[labelText as keyof TextFields]}
        placeholder={labelText}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextField;
