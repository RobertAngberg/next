"use client";

import { useState } from "react";

export default function YearSelect() {
  const [year, setYear] = useState("2024");

  return (
    <>
      <label className="p-3 text-white" htmlFor="year">
        Visa år:
      </label>
      <select
        className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white font-bold py-2 px-4 mt-10 rounded"
        id="year"
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
    </>
  );
}
