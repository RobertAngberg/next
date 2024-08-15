import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { sv } from "date-fns/locale/sv";
registerLocale("sv", sv);
import "react-datepicker/dist/react-datepicker.css";

function Information({
  belopp,
  setBelopp,
  transaktionsdatum,
  setTransaktionsdatum,
}: InformationProps) {
  return (
    <div className="padder">
      <label htmlFor="belopp">Belopp:</label>
      <input
        className="w-full p-2 mb-4 text-black border-2 border-gray-600 border-solid rounded"
        type="number"
        id="belopp"
        name="belopp"
        required
        value={belopp}
        onChange={(e) => setBelopp(Number(e.target.value))}
      />
      <div>
        <label htmlFor="datum">Betaldatum (ÅÅÅÅ-MM-DD):</label>
        <br />
        <DatePicker
          className="w-full p-2 text-black border-2 border-gray-600 border-solid rounded mb-4"
          id="datum"
          selected={transaktionsdatum ? new Date(transaktionsdatum) : null} // String till Date
          onChange={(date) => {
            setTransaktionsdatum(date ? date.toISOString() : ""); // Date till String
          }}
          dateFormat="yyyy-MM-dd"
          locale="sv"
          required
        />
      </div>
    </div>
  );
}

export { Information };
