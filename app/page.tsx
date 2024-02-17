"use client";

import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Card from "./Card";
import useFetch from "./hooks/useFetch";

type RowData = {
  id: number;
  datum: string;
  fil: string;
  belopp: string;
  inkomst_utgift: "Inkomst" | "Utgift";
  land: string;
  konto1: string;
  konto2: string;
  konto3: string;
  titel: string;
  kommentar: string;
};

export default function Home() {
  const { error, fetchData } = useFetch("http://localhost:3000/api");

  const chartData = {
    labels: fetchData?.allRows.map((row: RowData) => row.datum) || [],
    datasets: [
      {
        label: "Belopp",
        data: fetchData?.allRows.map((row: RowData) => row.belopp) || [],
        backgroundColor: "rgb(8, 51, 68)",
      },
    ],
  };

  return (
    <main className="items-center p-24 text-center">
      <div className="flex">
        <Card title="Inkomster" data={fetchData?.totalInkomst || 0} />
        <Card title="Utgifter" data={fetchData?.totalUtgift || 0} />
        <Card title="Resultat" data={fetchData?.resultat || 0} />
      </div>

      <Bar datasetIdKey="id" data={chartData} />
    </main>
  );
}
