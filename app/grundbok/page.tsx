"use client";

import { useEffect, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";
import React from "react";

export default function Grundbok() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [year, setYear] = useState("");
  const [activeTransId, setActiveTransId] = useState<number | null>(null);
  const [details, setDetails] = useState<TransactionDetail[]>([]);
  const { fetchData } = useFetchGet(`api/grundbok/?q=${year}`);

  useEffect(() => {
    if (fetchData) {
      const adjustedData = fetchData.yearData.map((item: HistoryItem) => {
        // Justera datum...
        const adjustedDate = new Date(item.transaktionsdatum);
        adjustedDate.setDate(adjustedDate.getDate() + 1); // +1 dag
        item.transaktionsdatum = adjustedDate.toISOString().slice(0, 10);
        return item;
      });
      setHistoryData(adjustedData);
    }
  }, [fetchData]);

  const handleRowClick = async (transaktionsId: number) => {
    if (transaktionsId === activeTransId) {
      setActiveTransId(null); // Göm
      setDetails([]);
    } else {
      try {
        const response = await fetch(`api/grundbok/?q=row${transaktionsId}`);
        if (!response.ok) {
          throw new Error("Fel, vänligen försök igen.");
        }
        const data = await response.json();
        setDetails(data);
        setActiveTransId(transaktionsId);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <main className="items-center min-h-screen text-center text-white md:px-10 bg-slate-950">
      <div className="flex flex-col items-center justify-center p-10 text-center md:flex-row md:text-left">
        <h1 className="mb-4 text-4xl font-bold md:mb-0 md:mr-4">Grundbok</h1>
        <div>
          <select
            className="px-4 py-2 font-bold text-white rounded cursor-pointer bg-cyan-600 hover:bg-cyan-700"
            id="year"
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>
      <table className="w-full m-auto md:w-3/4">
        <thead className="text-lg bg-cyan-950">
          <tr>
            <th className="p-5 pl-10 rounded-tl-lg">ID</th>
            <th className="p-5">Date</th>
            <th className="p-5 hidden md:table-cell">File</th>
            <th className="p-5">Account</th>
            <th className="p-5">Amount</th>
            <th className="p-5 hidden md:table-cell pr-10 rounded-tr-lg">
              Comment
            </th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((item) => (
            <React.Fragment key={item.transaktions_id}>
              <tr
                key={item.transaktions_id}
                onClick={() => handleRowClick(item.transaktions_id)}
                className="even:bg-gray-950 odd:bg-gray-900 hover:bg-gray-700 cursor-pointer"
              >
                <td className="p-5">{item.transaktions_id}</td>
                <td className="p-5">{item.transaktionsdatum}</td>
                <td className="p-5 hidden md:table-cell">{item.fil}</td>
                <td className="p-5">{item.kontobeskrivning}</td>
                <td className="p-5">{item.belopp}</td>
                <td className="p-5 hidden md:table-cell">{item.kommentar}</td>
              </tr>
              {activeTransId === item.transaktions_id && (
                <tr className="bg-gray-800 text-left">
                  <td colSpan={6}>
                    <div className="flex justify-center items-center p-5">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="w-1/3">Account</th>
                            <th className="w-1/3">Debit</th>
                            <th className="w-1/3">Credit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.map((detail) => (
                            <tr key={detail.transaktionspost_id}>
                              <td>{detail.kontobeskrivning}</td>
                              <td>{detail.debet}</td>
                              <td>{detail.kredit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </main>
  );
}
