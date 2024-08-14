"use client";

import { useState, useEffect } from "react";
import { useFetchGet } from "../hooks/useFetchGet";

function Huvudbok() {
  const { fetchData } = useFetchGet("api/huvudbok");
  const [groupedData, setGroupedData] = useState<GroupedTransactions>({});
  const [expandedAccInfo, setExpandedAccInfo] = useState<string | null>(null);

  // Ta fetchdata och gruppera transaktioner efter Kontobeskrivning
  // Detta gör att varje konto visas som en egen grupp
  useEffect(() => {
    if (fetchData) {
      const groupedFinished: GroupedTransactions = fetchData.reduce(
        (groupedTransactions: GroupedTransactions, item: TransactionItem) => {
          // Använd kontobeskrivning som varje key (se GroupedTransactions)
          const key: string = item.kontobeskrivning;
          // Skapa ny array om nyckeln inte redan finns
          if (!groupedTransactions[key]) {
            groupedTransactions[key] = [];
          }
          // Lägg till transaktionen i rätt grupp
          groupedTransactions[key].push(item);
          return groupedTransactions;
        },
        {} // Initiera som tomt objekt
      );

      // Uppdatera state med de grupperade transaktionerna
      setGroupedData(groupedFinished);
    }
  }, [fetchData]);

  const toggleAccInfo = (description: string) => {
    setExpandedAccInfo(expandedAccInfo === description ? null : description);
  };

  return (
    <main className="flex justify-center min-h-screen bg-slate-950">
      <div className="text-left w-full max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-white py-10 text-center">Huvudbok</h1>
        {Object.keys(groupedData).map((description, index) => (
          <div key={index} className="mb-4">
            {/* En div/grupp för varje konto - minimerade */}
            <div
              onClick={() => toggleAccInfo(description)}
              className="text-white flex justify-between items-center cursor-pointer py-2 bg-cyan-950 rounded-tl-lg pr-10 rounded-tr-lg "
            >
              <span className="text-white text-lg flex justify-between items-center cursor-pointer bg-cyan-950 p-5 pl-10 font-bold">
                {/* T.ex. 1930 - Företagskonto */}
                {groupedData[description][0].kontonummer} - {description}
              </span>
              <span>{expandedAccInfo === description ? "▽" : "▷"}</span>
            </div>
            {/* Maximerade */}
            {expandedAccInfo === description && (
              <table className="w-full text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-1 pl-8 py-3">Datum</th>
                    <th>Konto</th>
                    <th className="hidden md:table-cell">Fil</th>
                    <th>Debet</th>
                    <th>Kredit</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData[description].map((item, index) => (
                    <tr className="even:bg-gray-950 odd:bg-gray-900 hover:bg-gray-700" key={index}>
                      <td className="pl-8 py-2">{item.transaktionsdatum.slice(0, 10)}</td>
                      <td>{item.kontobeskrivning}</td>
                      <td>{item.fil}</td>
                      <td>{item.debet}</td>
                      <td>{item.kredit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Huvudbok;
