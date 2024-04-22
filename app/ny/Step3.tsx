import useFetchPost from "../hooks/useFetchPost";

const Step3: React.FC<Step3Props> = ({
  kontonummer,
  kontobeskrivning,
  kontotyp,
  fil,
  belopp,
  transaktionsdatum,
  kommentar,
  setCurrentStep,
}) => {
  // Om null eller undefined, sätt till 0
  const moms = (belopp ?? 0) * 0.2;
  const beloppUtanMoms = (belopp ?? 0) * 0.8;

  // Fattar fortfarande inte helt
  const postFormData = useFetchPost();

  const handleSubmit = async () => {
    const formData = new FormData();
    const datum10First = transaktionsdatum.slice(0, 10);

    const formFields = {
      fil: fil || "",
      transaktionsdatum: datum10First,
      kommentar,
      kontonummer,
      kontobeskrivning,
      kontotyp,
      belopp,
      moms,
      beloppUtanMoms,
    };

    // Loopar igenom alla värden i formFields och lägger till dem i formData
    // Ehh, sista steget... ta bort?
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

    setCurrentStep(4);
  };

  return (
    <main className="items-center text-center bg-slate-950 min-h-screen text-white">
      <div className="w-full text-white md:mx-auto md:w-2/5 bg-cyan-950 p-10 rounded rounded-3xl">
        <h1 className="text-3xl font-bold bokföring mb-4">Slutför bokföring</h1>
        <p className="w-full font-bold">{kontobeskrivning}</p>
        <p className="w-full mb-6">{transaktionsdatum}</p>
        <table className="border border-gray-300 mb-8 w-full text-left">
          <thead>
            <tr>
              <th className="p-4 border-b">Konto</th>
              <th className="p-4 border-b">Debet</th>
              <th className="p-4 border-b">Kredit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4">Företagskonto</td>
              <td className="p-4">{kontotyp === "Intäkt" ? belopp : 0}</td>
              <td className="p-4">{kontotyp === "Kostnad" ? belopp : 0}</td>
            </tr>
            <tr>
              <td className="p-4">
                {kontotyp === "Kostnad" ? "Ingående moms" : "Utgående moms"}
              </td>
              <td className="p-4">{kontotyp === "Kostnad" ? moms : 0}</td>
              <td className="p-4">{kontotyp === "Intäkt" ? moms : 0}</td>
            </tr>
            <tr>
              <td className="p-4">{kontonummer}</td>
              <td className="p-4">
                {kontotyp === "Kostnad" ? beloppUtanMoms : 0}
              </td>
              <td className="p-4">
                {kontotyp === "Intäkt" ? beloppUtanMoms : 0}
              </td>
            </tr>
          </tbody>
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
