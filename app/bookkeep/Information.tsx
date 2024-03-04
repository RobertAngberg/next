"use client";

import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { sv } from "date-fns/locale/sv";
registerLocale("sv", sv);

import "react-datepicker/dist/react-datepicker.css";

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
      <input
        className="w-full p-2 mb-4 border-solid border-2 border-gray-600 rounded text-black"
        type="number"
        id="belopp"
        name="belopp"
        placeholder="Ex: 250"
        required
        value={belopp}
        onChange={(e) => setBelopp(e.target.value)}
      />

      <label htmlFor="säljarens_land">Säljarens land:</label>
      <select
        className="w-full mb-4 p-2 border-solid border-2 border-gray-600 rounded text-black"
        id="säljarens_land"
        name="säljarens_land"
        value={säljarensLand}
        onChange={(e) => setSäljarensLand(e.target.value)}
      >
        <option value="Sverige">Från Sverige</option>
        <option value="EU">Från EU-land</option>
        <option value="Icke-EU">Från icke EU-land</option>
      </select>

      <div>
        <label htmlFor="datum">Betaldatum (ÅÅÅÅ-MM-DD):</label>
        <br />
        <DatePicker
          className="w-full p-2 border-solid border-2 border-gray-600 rounded text-black"
          id="datum"
          selected={datum ? new Date(datum) : null} // String till Date
          onChange={date => {
            setDatum(date ? date.toISOString() : ""); // Date till String
          }}
          dateFormat="yyyy-MM-dd"
          locale="sv"
          required
        />
      </div>
    </div>
  );
};

export default Information;
