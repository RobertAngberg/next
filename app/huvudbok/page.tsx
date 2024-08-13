"use client";

import React, { useState, useEffect } from "react";
import useFetchGet from "../hooks/useFetchGet";

export default function Huvudbok() {
  const { fetchData } = useFetchGet("api/huvudbok");
  const [groupedData, setGroupedData] = useState<GroupedTransactions>({});
  const [expandedAccInfo, setExpandedAccInfo] = useState<string | null>(null);

  // Organisera transaktioner efter "kontobeskrivning" in i groupedData (object)
  useEffect(() => {
    if (fetchData) {
      // Gruppera och sortera transaktioner efter "kontobeskrivning"
      const groupedFinished: GroupedTransactions = fetchData.reduce(
        (groupedTransactions: GroupedTransactions, item: TransactionItem) => {
          // Använd kontobeskrivning som nyckel för grouping
          const key: string = item.kontobeskrivning;
          // Gör ny array om nyckeln inte redan finns
          if (!groupedTransactions[key]) {
            groupedTransactions[key] = [];
          }
          // Lägg till transaktionen i rätt grupp
          groupedTransactions[key].push(item);
          return groupedTransactions;
        },
        {} // Initiera som ett tomt objekt
      );

      // Uppdatera state med de grupperade transaktionerna
      setGroupedData(groupedFinished);
    }
  }, [fetchData]);

  const toggleAccInfo = (description: string) => {
    setExpandedAccInfo((prev) => (prev === description ? null : description));
  };

  return (
    <main className="flex justify-center min-h-screen bg-slate-950">
      <div className="text-left w-full max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-white py-10 text-center">Huvudbok</h1>
        {Object.keys(groupedData).map((description, index) => (
          <div key={index} className="mb-4">
            <h3
              onClick={() => toggleAccInfo(description)}
              className="text-white flex justify-between items-center cursor-pointer py-2 bg-cyan-950 rounded-tl-lg pr-10 rounded-tr-lg "
            >
              <span className="text-white text-lg flex justify-between items-center cursor-pointer bg-cyan-950 p-5 pl-10 font-bold">
                {groupedData[description][0].kontonummer} - {description}
              </span>
              <span>{expandedAccInfo === description ? "▽" : "▷"}</span>
            </h3>
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
