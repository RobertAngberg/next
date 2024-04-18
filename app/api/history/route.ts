import { QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

  //////////////////////////////////////////
  // Klick på en rad i tabellen
  //////////////////////////////////////////

  if (params && params.includes("row")) {
    // Grab the number after "row" in the query parameter
    const match = params.match(/row(\d+)/);
    if (match && match[1]) {
      const transaktionsId = parseInt(match[1], 10);

      // Query to join transaktionsposter with konton on konto_id
      const postDataQuery = await sql`
        SELECT tp.*, k.kontobeskrivning
        FROM transaktionsposter tp
        INNER JOIN konton k ON tp.konto_id = k.konto_id
        WHERE tp.transaktions_id = ${transaktionsId}
        ORDER BY tp.transaktions_id DESC;`;

      const data = postDataQuery.rows;

      console.log(data);

      return NextResponse.json(data);
    }
  }

  //////////////////////////////////////////
  // Visa data för specifikt år eller alla
  //////////////////////////////////////////

  let yearData: QueryResultRow[] | null;

  if (params && !params.includes("row")) {
    // Specifikt år
    const yearQuery = await sql`
        SELECT * FROM transaktioner
        WHERE EXTRACT(YEAR FROM transaktionsdatum) = ${params}
        ORDER BY transaktionsdatum DESC;`;
    yearData = yearQuery.rows;
  } else {
    // Inget år valt
    const allDataQuery = await sql`
        SELECT * FROM transaktioner
        ORDER BY transaktionsdatum DESC;`;
    yearData = allDataQuery.rows;
  }

  return NextResponse.json({ yearData }, { status: 200 });
}
