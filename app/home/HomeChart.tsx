"use client";

import "chart.js/auto";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import useFetchGet from "../hooks/useFetchGet";

export default function HomeChart() {
  const [year, setYear] = useState("2024");
  const { fetchData } = useFetchGet(`api/home?q=${year}`);

  const data = {
    // slice10 ger yyyy-mm-dd
    labels: fetchData?.yearData.map((row: { datum: string }) =>
      row.datum.slice(0, 10)
    ),
    datasets: [
      {
        label: "Belopp",
        data: fetchData?.yearData.map((row: { belopp: number }) => row.belopp),
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
  <div className="flex flex-col items-center justify-center w-full p-4 md:px-20">
    <div className="flex justify-center w-full">
      <Bar
        datasetIdKey="id"
        options={options}
        data={data}
      />
    </div>
    <div className="flex flex-col items-center justify-center w-full mt-4">
      <label className="mb-2 font-bold text-white" htmlFor="year">
        Visa år:
      </label>
      <select
        className="w-full px-4 py-2 font-bold text-white rounded cursor-pointer bg-cyan-600 hover:bg-cyan-700 sm:w-auto"
        id="year"
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">Välj</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>
  </div>
);

  
}
