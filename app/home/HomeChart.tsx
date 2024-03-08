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
