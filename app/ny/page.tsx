"use client";

import { useState } from "react";
import AccountSearch from "./AccountSearch";

export default function Ny() {
  const [searchText, setSearchText] = useState("");
  const [motkonto, setMotkonto] = useState<string | undefined>(undefined);

  // Variabler här för att spara data från val och grejer

  return (
    <main className="items-center text-center bg-slate-950 min-h-screen pt-10">
      <div className="w-full text-white md:mx-auto md:w-2/5 bg-cyan-950 p-10 rounded rounded-3xl">
        <AccountSearch
          searchText={searchText}
          setSearchText={setSearchText}
          setMotkonto={setMotkonto}
        />
        <br></br>
        <br></br>
        Valt motkonto avgör debet eller kredit. Jaaaa första siffran avgör -
        genomfras
        <br></br>
        <br></br>
        Börja med de jag använder och se debet och kredit...
        <br></br>
        <br></br>
        Konto_typ avgör debet och kredit? Japp
      </div>
    </main>
  );
}
