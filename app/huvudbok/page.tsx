"use client";

import { useState, useEffect } from "react";
import useFetchGet from "../hooks/useFetchGet";

export default function Huvudbok() {
  const { fetchData } = useFetchGet("api/huvudbok");
  const [groupedData, setGroupedData] = useState<
    Record<string, TransactionItem[]>
  >({});
  const [expandedDescription, setExpandedDescription] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (fetchData) {
      const grouped = fetchData.reduce(
        (acc: Record<string, TransactionItem[]>, item: TransactionItem) => {
          const key = item.kontobeskrivning;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        },
        {}
      );
      setGroupedData(grouped);
    }
  }, [fetchData]);

  const toggleDescription = (description: string) => {
    setExpandedDescription((prev) =>
      prev === description ? null : description
    );
  };

  return (
    <main className="flex justify-center min-h-screen bg-slate-950">
      <div className="text-left w-full max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-white py-10 text-center">
          Huvudbok
        </h1>
        {Object.keys(groupedData).map((description, index) => (
          <div key={index} className="mb-4">
            <h3
              onClick={() => toggleDescription(description)}
              className="text-white flex justify-between items-center cursor-pointer py-2 mb-2 bg-cyan-950 rounded-tl-lg pr-10 rounded-tr-lg "
            >
              <span className="text-white flex justify-between items-center cursor-pointer py-2 bg-cyan-950 p-5 pl-10 p-20 font-bold">
                {groupedData[description][0].kontonummer} - {description}
              </span>
              <span>{expandedDescription === description ? "▼" : "▶"}</span>
            </h3>
            {expandedDescription === description && (
              <div className="py-2">
                <table className="w-full text-white">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-1 pl-4 py-2">Datum</th>
                      <th>Konto</th>
                      <th className="hidden md:table-cell">Fil</th>
                      <th>Debet</th>
                      <th>Kredit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedData[description].map((item, index) => (
                      <tr
                        className="border-t border-b border-gray-700 even:bg-gray-950 odd:bg-gray-900 hover:bg-gray-700"
                        key={index}
                      >
                        <td className="pl-4 py-2">
                          {item.transaktionsdatum.slice(0, 10)}
                        </td>
                        <td>{item.kontobeskrivning}</td>
                        <td>{item.fil}</td>
                        <td>{item.debet}</td>
                        <td>{item.kredit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
