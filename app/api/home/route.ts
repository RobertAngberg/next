import { QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

  if (params !== null && typeof Number) {
    let yearData: QueryResultRow[] | null;

    // Extract är för att få ut året "YYYY" från "datum"
    // så att man kan jämföra med "params"
    const yearQuery = await sql`
      SELECT * FROM test 
      WHERE EXTRACT(year FROM datum) = ${params} 
      ORDER BY datum DESC;`;
    yearData = yearQuery.rows;

    // Alla inkomster summerat
    const dataInkomst = await sql`
      SELECT SUM(belopp) AS totalBelopp FROM test 
      WHERE Inkomst_utgift = 'Inkomst';`;
    const totalInkomst: number = dataInkomst.rows[0].totalbelopp;

    // Alla utgifter summerat
    const dataUtgift = await sql`
      SELECT SUM(belopp) AS totalBelopp FROM test 
      WHERE Inkomst_utgift = 'Utgift';`;
    const totalUtgift: number = dataUtgift.rows[0].totalbelopp;

    // Resultat = inkomst - utgift
    const totalResultat: number = totalInkomst - totalUtgift;

    // Alla rows som finns i table, sorterat efter datum
    const query = await sql`
      SELECT * FROM test ORDER BY datum DESC;`;
    const allRows: QueryResultRow[] = query.rows;

    return NextResponse.json(
      { totalInkomst, totalUtgift, totalResultat, allRows, yearData },
      { status: 200 }
    );
  }
}
