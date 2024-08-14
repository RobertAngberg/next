function TextField({ labelText, textFields, handleInputChange }: InputComponentProps) {
  return (
    <div key={labelText} className="w-full">
      <label htmlFor={labelText}>{labelText}:</label>
      <input
        className="w-full p-2 mb-2 mt-2 border-solid border-2 border-gray-600 rounded-md text-black"
        type="text"
        id={labelText}
        name={labelText}
        value={textFields[labelText as keyof TextFields]}
        placeholder={labelText}
        onChange={handleInputChange}
      />
    </div>
  );
}

export { TextField };
