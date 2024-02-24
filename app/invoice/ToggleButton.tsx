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
  isVisible: boolean;
  onToggle: (group: Group) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  toggleGroup,
  buttonText,
  isVisible,
  onToggle,
}) => (
  <button
    onClick={() => onToggle(toggleGroup)}
    className="cursor-pointer mb-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
  >
    {buttonText}: {isVisible ? "↓" : "→"}
  </button>
);

export default ToggleButton;
