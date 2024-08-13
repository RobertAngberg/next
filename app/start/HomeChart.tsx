"use client";

import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function HomeChart({ setYear, chartData }: HomeChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [inkomsterData, setInkomsterData] = useState<number[]>([]);
  const [kostnadData, setKostnadData] = useState<number[]>([]);

  useEffect(() => {
    // [] runt date = allows you to use any string as a key in groupedData
    const groupedData: {
      [date: string]: { inkomst: number; kostnad: number };
    } = {};

    chartData?.forEach((row) => {
      // Justera datum +1
      const adjustedDate = new Date(row.transaktionsdatum);
      adjustedDate.setDate(adjustedDate.getDate() + 1); // +1 dag
      const date = adjustedDate.toISOString().slice(0, 10);

      if (!groupedData[date]) {
        groupedData[date] = { inkomst: 0, kostnad: 0 };
      }
      if (row.kontotyp === "Intäkt") {
        groupedData[date].inkomst += row.belopp;
      } else if (row.kontotyp === "Kostnad") {
        groupedData[date].kostnad += row.belopp;
      }
    });

    const tempLabels = Object.keys(groupedData).sort();
    const tempInkomsterData = tempLabels.map((date) => groupedData[date].inkomst);
    // Negate costs to go downwards
    const tempKostnadData = tempLabels.map((date) => -groupedData[date].kostnad);

    setLabels(tempLabels);
    setInkomsterData(tempInkomsterData);
    setKostnadData(tempKostnadData);
  }, [chartData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Inkomster",
        data: inkomsterData,
        backgroundColor: "rgb(0, 128, 128)",
      },
      {
        label: "Kostnad",
        data: kostnadData,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white",
          font: {
            size: 18,
          },
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
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
    maintainAspectRatio: false,
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
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
      <div className="relative p-10" style={{ height: "80vh" }}>
        <Bar datasetIdKey="id" options={options} data={data} className="h-full" />
      </div>
    </div>
  );
}
