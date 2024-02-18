"use client";

import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

type RowData = {
  id: number;
  datum: string;
  belopp: string;
};
type HomeChartProps = {
  year: string;
  setYear: (year: string) => void;
  chartData: RowData[] | undefined;
};

export default function HomeChart({ setYear, chartData }: HomeChartProps) {
  const data = {
    labels: chartData?.map((row) => row.datum) || [],
    datasets: [
      {
        label: "Belopp",
        data: chartData?.map((row) => row.belopp) || [],
        backgroundColor: "rgb(8, 51, 68)",
      },
    ],
  };

  return (
    <div>
      <div className="mx-auto w-4/5">
        <Bar datasetIdKey="id" data={data} className="p-10 h-60" />
      </div>
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
    </div>
  );
}
