import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const paramsGrab = new URL(request.url).searchParams;
  const params = paramsGrab.get("q");

  if (params !== null && typeof Number) {
    let yearData = null;

    // Sök efter år
    if (params) {
      const yearQuery =
        await sql`SELECT * FROM test WHERE EXTRACT(year FROM datum) = ${params} 
      ORDER BY datum DESC;`;
      yearData = yearQuery.rows;
    }

    const dataInkomst =
      await sql`SELECT SUM(belopp) AS totalBelopp FROM test WHERE Inkomst_utgift = 'Inkomst';`;
    const totalInkomst = dataInkomst.rows[0].totalbelopp;

    const dataUtgift =
      await sql`SELECT SUM(belopp) AS totalBelopp FROM test WHERE Inkomst_utgift = 'Utgift';`;
    const totalUtgift = dataUtgift.rows[0].totalbelopp;

    const resultat = totalInkomst - totalUtgift;

    const query = await sql`SELECT * FROM test ORDER BY datum DESC;`;
    const allRows = query.rows;

    return NextResponse.json(
      { totalInkomst, totalUtgift, resultat, allRows, yearData },
      { status: 200 }
    );
  }
}

////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////
