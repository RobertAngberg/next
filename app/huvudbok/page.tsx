"use client";

import { useState, useEffect } from "react";
import { useFetchGet } from "../hooks/useFetchGet";

function Huvudbok() {
  const { fetchData } = useFetchGet("api/huvudbok");
  const [groupedData, setGroupedData] = useState<GroupedTransactions>({});
  const [expandedAccInfo, setExpandedAccInfo] = useState<string | null>(null);

  useEffect(() => {
    if (fetchData) {
      const groupedFinished: GroupedTransactions = fetchData.reduce(
        (groupedTransactions: GroupedTransactions, item: TransactionItem) => {
          const key: string = item.kontobeskrivning;
          if (!groupedTransactions[key]) {
            groupedTransactions[key] = [];
          }
          groupedTransactions[key].push(item);
          return groupedTransactions;
        },
        {}
      );
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
            <div
              onClick={() => toggleAccInfo(description)}
              className="text-white flex justify-between items-center cursor-pointer py-2 bg-cyan-950 rounded-tl-lg pr-10 rounded-tr-lg "
            >
              <span className="text-white text-lg flex justify-between items-center cursor-pointer bg-cyan-950 p-5 pl-10 font-bold">
                {groupedData[description][0].kontonummer} - {description}
              </span>
              <span>{expandedAccInfo === description ? "▽" : "▷"}</span>
            </div>
            {expandedAccInfo === description && (
              <table className="w-full text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">Datum</th>
                    <th className="p-2 text-left">Konto</th>
                    <th className="p-2 text-left hidden sm:table-cell">Fil</th>
                    <th className="p-2 text-left">Debet</th>
                    <th className="p-2 text-left">Kredit</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData[description].map((item, index) => (
                    <tr className="even:bg-gray-950 odd:bg-gray-900 hover:bg-gray-700" key={index}>
                      <td className="p-2">{item.transaktionsdatum.slice(0, 10)}</td>
                      <td className="p-2">{item.kontobeskrivning}</td>
                      <td className="p-2 hidden sm:table-cell">{item.fil}</td>
                      <td className="p-2">{item.debet}</td>
                      <td className="p-2">{item.kredit}</td>
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
