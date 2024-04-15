"use client";

import React, { useEffect, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

type HuvudbokRad = {
  id: number;
  timestamp: string;
  transaktionsdatum: string;
  fil: string;
  inkomst_utgift: string;
  företagskonto: string;
  momskonto: string;
  belopp: number;
  land: string;
  kommentar: string;
};

type GrupperadHuvudbokData = {
  motkonto: string;
  grupperade_rader: HuvudbokRad[];
};

export default function Huvudbok() {
  const [data, setData] = useState<GrupperadHuvudbokData[]>([]);
  const [openMotkonto, setOpenMotkonto] = useState<string | null>(null);
  const { fetchData } = useFetchGet(`api/huvudbok`);

  useEffect(() => {
    if (fetchData && fetchData.data) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const toggleMotkonto = (motkonto: string) => {
    setOpenMotkonto(openMotkonto === motkonto ? null : motkonto);
  };

  return (
    <main className="items-center min-h-screen text-center text-white bg-slate-950">
      <h1 className="mb-4 text-4xl font-bold py-10">Huvudbok</h1>
      {data.map((item, index) => (
        <div key={index} className="mb-8 w-full">
          <h2
            className="text-xl font-semibold mb-3 cursor-pointer"
            onClick={() => toggleMotkonto(item.motkonto)}
          >
            {item.motkonto}
          </h2>
          {openMotkonto === item.motkonto && (
            <table className="text-center border-collapse border border-gray-200 m-auto">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Verifikationsdatum
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Fil</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Inkomst/Utgift
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Momskonto
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Belopp</th>
                  <th className="border border-gray-300 px-4 py-2">Land</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Kommentar
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.grupperade_rader.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-700">
                    <td className="border border-gray-300 px-4 py-2">
                      {row.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.transaktionsdatum}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.fil}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.inkomst_utgift}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.momskonto}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.belopp}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.land}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.kommentar}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </main>
  );
}
