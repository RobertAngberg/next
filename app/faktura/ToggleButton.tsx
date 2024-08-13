function ToggleButton({ toggleGroup, buttonText, fieldGroupVisible, onToggle }: ToggleButtonProps) {
  return (
    <button
      onClick={() => onToggle(toggleGroup)}
      className="cursor-pointer mb-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    >
      {buttonText}: {fieldGroupVisible ? "↓" : "→"}
    </button>
  );
}

export { ToggleButton };
