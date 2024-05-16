"use client";

import React, { useEffect, useState } from "react";
import Card from "./start/Card";
import HomeChart from "./start/HomeChart";
import useFetchGet from "./hooks/useFetchGet";
import DownloadXML from "./DownloadXML";

interface Data {
  period: string;
  forsMomsEjAnnan: number;
  inkopVaruAnnatEg: number;
  inkopTjanstAnnatEg: number;
  momsUlagImport: number;
  momsUtgHog: number;
  momsInkopUtgHog: number;
  momsImportUtgHog: number;
  momsIngAvdr: number;
  momsBetala: number;
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // Fetch data from the backend
    // Simulating data fetch here
    const fetchData = async () => {
      const response = await fetch("/api/data"); // Replace with your API endpoint
      const result = await response.json();

      const xmlData: Data = {
        period: result.period,
        forsMomsEjAnnan: result.forsMomsEjAnnan,
        inkopVaruAnnatEg: result.inkopVaruAnnatEg,
        inkopTjanstAnnatEg: result.inkopTjanstAnnatEg,
        momsUlagImport: result.momsUlagImport,
        momsUtgHog: result.momsUtgHog,
        momsInkopUtgHog: result.momsInkopUtgHog,
        momsImportUtgHog: result.momsImportUtgHog,
        momsIngAvdr: result.momsIngAvdr,
        momsBetala: result.momsBetala,
      };

      setData(xmlData);
    };

    fetchData();
  }, []);

  const [year, setYear] = useState<string>("2024");
  const { fetchData } = useFetchGet(`api/hem?q=${year}`);

  return (
    <main className="items-center text-center bg-slate-950">
      <div className="flex flex-col justify-center p-10 md:flex-row md:justify-start">
        <Card title="Inkomster" data={fetchData?.totalInkomst || 0} />
        <Card title="Utgifter" data={fetchData?.totalUtgift || 0} />
        <Card title="Resultat" data={fetchData?.totalResultat || 0} />
      </div>
      <HomeChart setYear={setYear} chartData={fetchData?.yearData} />

      <div>
        <h1>Download XML Example</h1>
        {data ? <DownloadXML data={data} /> : <p>Loading...</p>}
      </div>
    </main>
  );
}
