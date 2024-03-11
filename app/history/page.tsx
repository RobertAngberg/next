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
    <main className="items-center min-h-screen p-10 text-center text-white bg-slate-950">
      <table className="w-5/6 m-auto">
        <thead className="text-lg bg-cyan-950">
          <tr>
            <th className="p-5 pl-10 rounded-tl-lg">ID</th>
            <th>Datum</th>
            <th>Fil</th>
            <th>Konto 1</th>
            <th>Konto 2</th>
            <th>Konto 3</th>
            <th>Belopp</th>
            <th>Land</th>
            <th>Typ</th>
            <th>Titel</th>
            <th className="pr-10 rounded-tr-lg">Kommentar</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((item: HistoryItem) => (
            <tr
              key={item.id}
              className="border-t border-b border-gray-700 even:bg-gray-950 odd:bg-gray-900 hover:bg-gray-700"
            >
              <td className="p-5">{item.id}</td>
              {/* Visa bara första 10 tecken av datumet */}
              <td className="p-5">{item.datum}</td>
              <td className="p-5">{item.fil}</td>
              <td className="p-5">{item.konto1}</td>
              <td className="p-5">{item.konto2}</td>
              <td className="p-5">{item.konto3}</td>
              <td className="p-5">{item.belopp}</td>
              <td className="p-5">{item.land}</td>
              <td className="p-5">{item.inkomst_utgift}</td>
              <td className="p-5">{item.titel}</td>
              <td className="p-5">{item.kommentar}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className="p-3 text-white" htmlFor="year">
        Visa år:
      </label>
      <select
        className="px-4 py-2 mt-10 font-bold text-white rounded cursor-pointer bg-cyan-600 hover:bg-cyan-700"
        id="year"
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
    </main>
  );
}
