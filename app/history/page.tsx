"use client";

import { useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState("");
  const { fetchData } = useFetchGet("api?q=history");

  return (
    <main className="items-center p-10 text-center bg-slate-950">gay</main>
  );
};

export default History;
