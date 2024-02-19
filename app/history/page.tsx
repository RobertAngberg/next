"use client";

import { useEffect, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState([]);
  const { fetchData } = useFetchGet("api?q=history");

  useEffect(() => {
    if (fetchData && fetchData.allRows) {
      setHistoryData(fetchData.allRows);
    }
    console.log("Loggy: History:React.FC -> fetchData", fetchData);
  }, [fetchData]);

  return (
    <main className="items-center p-10 text-center bg-slate-950 text-white">
      <table className="m-auto">
        <thead className="bg-cyan-950 pb-20">
          <tr>
            <th className="p-6 rounded-tl-lg pl-10">ID</th>
            <th>Datum</th>
            <th>Konto1</th>
            <th>Konto2</th>
            <th>Konto3</th>
            <th>Belopp</th>
            <th>Land</th>
            <th>Inkomst_utgift</th>
            <th>Titel</th>
            <th className="rounded-tr-lg pr-10">Kommentar</th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-slate-900 [&>*:nth-child(even)]:bg-slate-800">
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
    </main>
  );
};

export default History;
