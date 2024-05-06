"use client";

import React, { useState } from "react";
import Card from "./start/Card";
import HomeChart from "./start/HomeChart";
import useFetchGet from "./hooks/useFetchGet";

export default function Home() {
  const [year, setYear] = useState("2024");
  const { fetchData } = useFetchGet(`api/hem?q=${year}`);

  return (
    <main className="items-center text-center bg-slate-950">
      <div className="flex flex-col justify-center p-10 md:flex-row md:justify-start">
        <Card title="Inkomster" data={fetchData?.totalInkomst || 0} />
        <Card title="Utgifter" data={fetchData?.totalUtgift || 0} />
        <Card title="Resultat" data={fetchData?.totalResultat || 0} />
      </div>
      <HomeChart
        year={year}
        setYear={setYear}
        chartData={fetchData?.yearData}
      />
    </main>
  );
}
