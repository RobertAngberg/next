"use client";

import { useEffect, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState([]);
  const [year, setYear] = useState("2024");
  const { fetchData } = useFetchGet(`api/?q=${year}`);

  useEffect(() => {
    if (fetchData) {
      setHistoryData(fetchData.yearData);
    }
  }, [fetchData]);

  return (
    <main className="min-h-screen items-center p-10 text-center bg-slate-950 text-white">
      <table className="m-auto">
        <thead className="bg-cyan-950 text-lg">
          <tr>
            <th className="p-6 pl-10 rounded-tl-lg">ID</th>
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
          {historyData.map(
            (item: {
              id: string;
              datum: string;
              fil: string;
              konto1: string;
              konto2: string;
              konto3: string;
              belopp: string;
              land: string;
              inkomst_utgift: string;
              titel: string;
              kommentar: string;
            }) => (
              <tr
                key={item.id}
                className="even:bg-gray-950 odd:bg-gray-900 border-b border-t border-gray-700 hover:bg-gray-700"
              >
                <td className="p-5">{item.id}</td>
                {/* Visa bara första 10 tecken av datumet */}
                <td className="p-5">{item.datum.slice(0, 10)}</td>
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
            )
          )}
        </tbody>
      </table>
      <br />
      <label className="p-3 text-white" htmlFor="year">
        Visa år:
      </label>
      <select
        className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
        id="year"
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">Välj</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </main>
  );
};

export default History;