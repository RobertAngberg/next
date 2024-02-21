"use client";

type AccountsProps = {
  konto1: string;
  setKonto1: (value: string) => void;
  konto2: string;
  setKonto2: (value: string) => void;
  konto3: string;
  setKonto3: (value: string) => void;
};

const Accounts: React.FC<AccountsProps> = ({
  konto1,
  setKonto1,
  konto2,
  setKonto2,
  konto3,
  setKonto3,
}) => {
  return (
    <div>
      <label htmlFor="konto1">Ditt konto, oftast 1930:</label>
      <input
        className="w-full p-2  border-solid border-2 border-gray-600 rounded text-black"
        type="text"
        id="konto1"
        name="konto1"
        value={konto1}
        onChange={(e) => setKonto1(e.target.value)}
        required
      />
      <br />
      <br />
      <label htmlFor="konto2">Moms:</label>
      <br />
      <input
        className="w-full p-2  border-solid border-2 border-gray-600 rounded text-black"
        type="text"
        id="konto2"
        name="konto2"
        placeholder="Glöm inte att välja inkomst eller utgift"
        value={konto2}
        onChange={(e) => setKonto2(e.target.value)}
        required
      />
      <br />
      <br />
      <label htmlFor="konto3">Motkonto:</label>
      <br />
      <input
        className="w-full p-2  border-solid border-2 border-gray-600 rounded text-black"
        type="text"
        id="konto3"
        name="konto3"
        value={konto3}
        onChange={(e) => setKonto3(e.target.value)}
        required
      />
      <br />
      <br />
    </div>
  );
};

export default Accounts;
