"use client";

import React, { useEffect, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";
import GrundbokHeader from "./GrundbokHeader";
import GrundbokTable from "./GrundbokTable";

export default function Grundbok() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [year, setYear] = useState("");
  const [activeTransId, setActiveTransId] = useState<number | null>(null);
  const [details, setDetails] = useState<TransactionDetail[]>([]);
  const { fetchData } = useFetchGet(`api/grundbok/?q=${year}`);

  // Justera datum +1
  useEffect(() => {
    if (fetchData) {
      const adjustedData = fetchData.yearData.map((item: HistoryItem) => {
        const adjustedDate = new Date(item.transaktionsdatum);
        adjustedDate.setDate(adjustedDate.getDate() + 1); // +1 dag
        item.transaktionsdatum = adjustedDate.toISOString().slice(0, 10);
        return item;
      });
      setHistoryData(adjustedData);
    }
  }, [fetchData]);

  const handleRowClick = async (transaktionsId: number) => {
    // Om klickad rad redan är aktiv, stäng detaljer
    if (transaktionsId === activeTransId) {
      setActiveTransId(null);
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
        console.error("Fel:", error);
      }
    }
  };

  return (
    <main className="items-center min-h-screen text-center text-white md:px-10 bg-slate-950">
      <GrundbokHeader setYear={setYear} />
      <GrundbokTable
        historyData={historyData}
        handleRowClick={handleRowClick}
        activeTransId={activeTransId}
        details={details}
      />
    </main>
  );
}
