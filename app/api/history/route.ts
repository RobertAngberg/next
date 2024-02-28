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

    // Alla rows som finns i table, sorterat efter datum
    const query = await sql`
      SELECT * FROM test ORDER BY datum DESC;`;
    const allRows: QueryResultRow[] = query.rows;

    return NextResponse.json({ allRows, yearData }, { status: 200 });
  }
}
