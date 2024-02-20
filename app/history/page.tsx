"use client";

import { useEffect, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState([]);
  const [year, setYear] = useState("");
  const { fetchData } = useFetchGet("api?q=history");

  useEffect(() => {
    if (fetchData) {
      setHistoryData(fetchData.allRows);
    }
    console.log("Loggy: History:React.FC -> fetchData", fetchData);
  }, [fetchData]);

  return (
    <main className="items-center p-10 text-center bg-slate-950 text-white">
      <table className="m-auto">
        <thead className="bg-cyan-950">
          <tr>
            <th className="p-6 rounded-tl-lg">id</th>
            <th>datum</th>
            <th>konto1</th>
            <th>konto2</th>
            <th>konto3</th>
            <th>belopp</th>
            <th>land</th>
            <th>inkomst_utgift</th>
            <th>titel</th>
            <th>kommentar</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map(
            (item: {
              id: string;
              datum: string;
              konto1: string;
              konto2: string;
              konto3: string;
              belopp: string;
              land: string;
              inkomst_utgift: string;
              titel: string;
              kommentar: string;
            }) => (
              <tr key={item.id}>
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.datum}</td>
                <td className="p-4">{item.konto1}</td>
                <td className="p-4">{item.konto2}</td>
                <td className="p-4">{item.konto3}</td>
                <td className="p-4">{item.belopp}</td>
                <td className="p-4">{item.land}</td>
                <td className="p-4">{item.inkomst_utgift}</td>
                <td className="p-4">{item.titel}</td>
                <td className="p-4">{item.kommentar}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <label className="p-3 text-white" htmlFor="year">
        Visa år:
      </label>
      <select
        className="text-black p-2"
        id="year"
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">Select</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </main>
  );
};

export default History;
