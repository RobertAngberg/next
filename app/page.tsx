"use client";

import React, { useState } from "react";
import Card from "./home/Card";
import HomeChart from "./home/HomeChart";
import useFetchGet from "./hooks/useFetchGet";

const Home: React.FC = () => {
  const [year, setYear] = useState("2024");
  const { fetchData } = useFetchGet(`api?q=${year}`);

  return (
    <main className="items-center p-10 text-center bg-slate-950">
      <div className="flex">
        <Card title="Inkomster" data={fetchData?.totalInkomst || 0} />
        <Card title="Utgifter" data={fetchData?.totalUtgift || 0} />
        <Card title="Resultat" data={fetchData?.resultat || 0} />
      </div>
      <HomeChart
        year={year}
        setYear={setYear}
        chartData={fetchData?.yearData}
      />
    </main>
  );
};

export default Home;
