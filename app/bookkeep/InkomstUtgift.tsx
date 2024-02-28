"use client";

const InkomstUtgift: React.FC<InkomstUtgiftProps> = ({
  radioInkomstUtgift,
  setRadioInkomstUtgift,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center">
        <label className="m-auto">
          <input
            type="radio"
            name="in_ut"
            value="utgift"
            checked={radioInkomstUtgift === "utgift"}
            onChange={(e) => setRadioInkomstUtgift(e.target.value)}
            className="mr-2"
          />
          Utgift
        </label>
        <label className="p-6">
          <input
            type="radio"
            name="in_ut"
            value="inkomst"
            checked={radioInkomstUtgift === "inkomst"}
            onChange={(e) => setRadioInkomstUtgift(e.target.value)}
            className="mr-2"
          />
          Inkomst
        </label>
      </div>
    </div>
  );
};

export default InkomstUtgift;
