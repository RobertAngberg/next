type Group =
  | "first4"
  | "second4"
  | "third4"
  | "fourth4"
  | "fifth4"
  | "sixth4"
  | "seventh4";

type ToggleButtonProps = {
  toggleGroup: Group;
  buttonText: string;
  fieldGroupVisible: boolean;
  onToggle: (group: Group) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  toggleGroup,
  buttonText,
  fieldGroupVisible,
  onToggle,
}) => (
  <button
    onClick={() => onToggle(toggleGroup)}
    className="cursor-pointer mb-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
  >
    {buttonText}: {fieldGroupVisible ? "↓" : "→"}
  </button>
);

export default ToggleButton;
