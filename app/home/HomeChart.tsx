"use client";

import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function HomeChart({ setYear, chartData }: HomeChartProps) {

  const data = {
    labels: chartData?.map((row) => row.verifikationsdatum) || [],
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
    <div className="w-full h-screen text-white md:mx-auto md:w-4/5">
      <label className="p-3 font-bold text-white" htmlFor="year">
        Visa år:
      </label>
      <select
        className="px-4 py-2 font-bold text-white rounded cursor-pointer bg-cyan-600 hover:bg-cyan-700"
        id="year"
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">Välj</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
      <Bar
        datasetIdKey="id"
        options={options}
        data={data}
        className="p-10 h-60"
      />
    </div>
  );
}
