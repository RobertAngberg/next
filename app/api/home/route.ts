import { QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

  if (params !== null && typeof Number) {
    let yearData: QueryResultRow[] | null;

    // Extract är för att få ut året "YYYY" från "datum"
    // så att man kan jämföra med "params"
    const yearQuery = await sql`
      SELECT * FROM transactions 
      WHERE EXTRACT(YEAR FROM TO_DATE(verifikationsdatum, 'YYYY-MM-DD')) = ${params} 
      ORDER BY verifikationsdatum DESC;`;
    yearData = yearQuery.rows;

    // Alla inkomster summerat
    const dataInkomst = await sql`
      SELECT SUM(belopp) AS totalBelopp FROM transactions 
      WHERE Inkomst_utgift = 'inkomst';`;
    const totalInkomst: number = dataInkomst.rows[0].totalbelopp;

    // Alla utgifter summerat
    const dataUtgift = await sql`
      SELECT SUM(belopp) AS totalBelopp FROM transactions 
      WHERE Inkomst_utgift = 'utgift';`;
    const totalUtgift: number = dataUtgift.rows[0].totalbelopp;

    // Resultat = inkomst - utgift
    const totalResultat: number = totalInkomst - totalUtgift;

    // Alla rows som finns i table, sorterat efter datum
    const query = await sql`
      SELECT * FROM transactions ORDER BY verifikationsdatum DESC;`;
    const allRows: QueryResultRow[] = query.rows;

    return NextResponse.json(
      { totalInkomst, totalUtgift, totalResultat, allRows, yearData },
      { status: 200 }
    );
  }
}
