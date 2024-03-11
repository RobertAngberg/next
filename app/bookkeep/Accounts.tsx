"use client";

import { useEffect } from "react";

const Accounts: React.FC<AccountsProps> = ({
  företagsKonto,
  setFöretagsKonto,
  motkonto,
  setMotkonto,
  momsKonto,
  setMomsKonto,
  radioInkomstUtgift,
}) => {
  useEffect(() => {
    if (radioInkomstUtgift === "inkomst") {
      setMomsKonto("2610 - Utgående moms, 25 %");
    } else if (radioInkomstUtgift === "utgift") {
      setMomsKonto("2640 - Ingående moms, 25 %");
    }
  }, [radioInkomstUtgift]);

  return (
    <div>
      <label htmlFor="konto1">Ditt konto, oftast 1930:</label>
      <input
        className="w-full p-2 mb-4 text-black border-2 border-gray-600 border-solid rounded"
        type="text"
        id="konto1"
        name="konto1"
        value={företagsKonto}
        onChange={(e) => setFöretagsKonto(String(e.target.value))}
        required
      />

      <label htmlFor="konto2">Motkonto:</label>
      <input
        className="w-full p-2 mb-4 text-black border-2 border-gray-600 border-solid rounded"
        type="text"
        id="konto2"
        name="konto2"
        value={motkonto}
        onChange={(e) => setMotkonto(String(e.target.value))}
        required
      />

      <label htmlFor="konto3">Momskonto</label>
      <input
        className="w-full p-2 mb-4 text-black border-2 border-gray-600 border-solid rounded"
        type="text"
        id="konto3"
        name="konto3"
        value={
          radioInkomstUtgift === "inkomst"
            ? "2610 - Utgående moms, 25 %"
            : radioInkomstUtgift === "utgift"
              ? "2640 - Ingående moms, 25 %"
              : momsKonto
        }
        onChange={(e) => setMomsKonto(String(e.target.value))}
        required
      />
    </div>
  );
};

export default Accounts;
