"use client";

import { useEffect, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [year, setYear] = useState("2024");
  const { fetchData } = useFetchGet(`api/history/?q=${year}`);

  useEffect(() => {
    if (fetchData) {
      setHistoryData(fetchData.yearData);
    }
  }, [fetchData]);

  return (
    <main className="items-center min-h-screen text-center text-white md:px-10 bg-slate-950">
      <div className="flex flex-col items-center justify-center p-10 text-center md:flex-row md:text-left">
        <h1 className="mb-4 text-4xl font-bold md:mb-0">Bokföringshistorik</h1>
        <div>
          <label className="p-3 text-white" htmlFor="year"></label>
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
            <th className="p-5">Datum</th>
            <th className="p-5 hidden md:table-cell">Fil</th>
            <th className="p-5">Konto</th>
            <th className="p-5">Belopp</th>
            <th className="p-5 hidden md:table-cell pr-10 rounded-tr-lg">
              Kommentar
            </th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((item: HistoryItem) => (
            <tr
              key={item.transaktions_id}
              className="border-t border-b border-gray-700 even:bg-gray-950 odd:bg-gray-900 hover:bg-gray-700"
            >
              <td className="p-5">{item.transaktions_id}</td>
              <td className="p-5">{item.bokföringstidspunkt.slice(0, 10)}</td>
              <td className="p-5 hidden md:table-cell">{item.fil}</td>
              <td className="p-5">{item.beskrivning}</td>
              <td className="p-5">{item.belopp}</td>
              <td className="p-5 hidden md:table-cell">{item.kommentar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
