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
      WHERE EXTRACT(year FROM TO_TIMESTAMP(verifikationsdatum, 'YYYY-MM-DD')) = ${params} 
      ORDER BY verifikationsdatum DESC;`;
    yearData = yearQuery.rows;

    // Alla rows som finns i table, sorterat efter datum
    const query = await sql`
      SELECT * FROM transactions ORDER BY verifikationsdatum DESC;`;
    const allRows: QueryResultRow[] = query.rows;

    return NextResponse.json({ allRows, yearData }, { status: 200 });
  }
}
