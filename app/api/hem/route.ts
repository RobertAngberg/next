import { QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

  if (params !== null && typeof Number) {
    let yearData: QueryResultRow[] | null;

    const yearQuery = await sql`
      SELECT * FROM transaktioner 
      WHERE EXTRACT(YEAR FROM transaktionsdatum) = ${params}
      ORDER BY transaktionsdatum DESC;`;
    yearData = yearQuery.rows;

    // Alla inkomster summerat
    const dataInkomst = await sql`
      SELECT SUM(belopp) AS totalBelopp FROM transaktioner 
      WHERE kontotyp = 'Intäkt';`;
    const totalInkomst: number = dataInkomst.rows[0].totalbelopp;

    // Alla utgifter summerat
    const dataUtgift = await sql`
      SELECT SUM(belopp) AS totalBelopp FROM transaktioner 
      WHERE kontotyp = 'Kostnad';`;
    const totalUtgift: number = dataUtgift.rows[0].totalbelopp;

    // Resultat = inkomst - utgift
    const totalResultat: number = totalInkomst - totalUtgift;

    // Alla rows som finns i table, sorterat efter datum
    const query = await sql`
      SELECT * FROM transaktioner ORDER BY transaktionsdatum DESC;`;
    const allRows: QueryResultRow[] = query.rows;

    return NextResponse.json(
      { totalInkomst, totalUtgift, totalResultat, allRows, yearData },
      { status: 200 }
    );
  }
}
