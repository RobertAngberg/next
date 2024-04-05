import useFetchPost from "../hooks/useFetchPost";

const Step3: React.FC<Step3Props> = ({
  kontonummer,
  kontonamn,
  kontotyp,
  file,
  belopp,
  land,
  datum,
  kommentar,
}) => {
  // Fattar fortfarande inte helt
  const postFormData = useFetchPost();

  const handleSubmit = async () => {
    const formData = new FormData();
    const datum10First = datum.slice(0, 10);

    const formFields = {
      fil: file || "",
      verifikationsdatum: datum10First,
      kontonummer,
      kontonamn,
      kontotyp,
      belopp,
      land,
      kommentar,
    };

    // Loopar igenom alla värden i formFields och lägger till dem i formData
    Object.entries(formFields).forEach(([key, value]) => {
      if (value instanceof File) {
        // Om det är en fil, lägg till filen i formData, tredje param är filens namn
        formData.append(key, value, value.name);
      } else {
        // Konverterar värdet till en sträng, detta om det är en siffra
        formData.append(key, value !== undefined ? String(value) : "");
      }
    });

    await postFormData("api/bookkeep/", formData);
  };

  return (
    <main className="items-center text-center bg-slate-950 min-h-screen text-white">
      <div className="w-full text-white md:mx-auto md:w-2/5 bg-cyan-950 p-10 rounded rounded-3xl">
        <h1 className="text-3xl font-bold bokföring mb-4">Slutför bokföring</h1>
        <p className="w-full font-bold">{kontonamn}</p>
        <p className="w-full mb-6">{datum}</p>
        <table className="border border-gray-300 mb-8 w-full text-left">
          <tr className="border-b border-gray-300">
            <th className="p-4 border-b">Konto</th>
            <th className="p-4 border-b">Debet</th>
            <th className="p-4 border-b">Kredit</th>
          </tr>
          <tr>
            <td className="p-4">Kontodata</td>
            <td className="p-4">Debetdata</td>
            <td className="p-4">Kreditdata</td>
          </tr>
          <tr>
            <td className="p-4">Kontodata</td>
            <td className="p-4">Debetdata</td>
            <td className="p-4">Kreditdata</td>
          </tr>
          <tr>
            <td className="p-4">Kontodata</td>
            <td className="p-4">Debetdata</td>
            <td className="p-4">Kreditdata</td>
          </tr>
        </table>

        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-6 font-bold text-white rounded bg-cyan-600 hover:bg-cyan-700"
          onClick={handleSubmit}
        >
          Bokför
        </button>
      </div>
    </main>
  );
};

export default Step3;
