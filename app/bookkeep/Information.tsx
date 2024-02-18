"use client";

type InformationProps = {
  belopp: string;
  setBelopp: (belopp: string) => void;
  säljarensLand: string;
  setSäljarensLand: (land: string) => void;
  datum: string;
  setDatum: (datum: string) => void;
};

const Information: React.FC<InformationProps> = ({
  belopp,
  setBelopp,
  säljarensLand,
  setSäljarensLand,
  datum,
  setDatum,
}) => {
  return (
    <div className="padder">
      <label htmlFor="belopp">Belopp:</label>
      <br />
      <input
        className="w-full p-2  border-solid border-2 border-gray-600 rounded"
        type="number"
        id="belopp"
        name="belopp"
        placeholder="Ex: 250"
        required
        value={belopp}
        onChange={(e) => setBelopp(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="säljarens_land">Säljarens land:</label>
      <br />
      <select
        className="w-full p-2 border-solid border-2 border-gray-600 rounded"
        id="säljarens_land"
        name="säljarens_land"
        value={säljarensLand}
        onChange={(e) => setSäljarensLand(e.target.value)}
      >
        <option value="Sverige">Från Sverige</option>
        <option value="EU">Från EU-land</option>
        <option value="Icke-EU">Från icke EU-land</option>
      </select>
      <br />
      <br />
      <label htmlFor="datum">Betaldatum:</label>
      <br />
      <input
        className="w-full p-2 border-solid border-2 border-gray-600 rounded"
        type="date"
        id="datum"
        name="datum"
        required
        value={datum}
        onChange={(e) => setDatum(e.target.value)}
      />
      <br />
      <br />
    </div>
  );
};

export default Information;
