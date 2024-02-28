"use client";

import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function HomeChart({ setYear, chartData }: HomeChartProps) {
  const data = {
    // slice10 ger yyyy-mm-dd
    labels: chartData?.map((row) => row.datum.slice(0, 10)) || [],
    datasets: [
      {
        label: "Belopp",
        data: chartData?.map((row) => row.belopp) || [],
        backgroundColor: "rgb(8, 51, 68)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: 18,
          },
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 18,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="mx-auto w-4/5 text-white">
        <Bar
          datasetIdKey="id"
          options={options}
          data={data}
          className="p-10 h-60"
        />
      </div>
      <label className="p-3 text-white font-bold" htmlFor="year">
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
    </div>
  );
}
