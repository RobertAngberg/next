import { QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

    let yearData: QueryResultRow[] | null;

    if (params) {
      // Query for a specific year
      const yearQuery = await sql`
        SELECT * FROM transaktioner
        WHERE EXTRACT(YEAR FROM transaktionsdatum) = ${params}
        ORDER BY transaktionsdatum DESC;`;
      yearData = yearQuery.rows;
    } else {
      // Query for all years if no parameter is specified
      const allDataQuery = await sql`
        SELECT * FROM transaktioner
        ORDER BY transaktionsdatum DESC;`;
      yearData = allDataQuery.rows;
    }

    return NextResponse.json({ yearData }, { status: 200 });
}
