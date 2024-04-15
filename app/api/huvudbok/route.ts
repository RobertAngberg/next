import { QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let data: QueryResultRow[];

  const query = await sql`
    SELECT 
        motkonto,
        json_agg(
            json_build_object(
                'id', id,
                'timestamp', timestamp,
                'transaktionsdatum', transaktionsdatum,
                'fil', fil,
                'inkomst_utgift', inkomst_utgift,
                'företagskonto', företagskonto,
                'momskonto', momskonto,
                'belopp', belopp,
                'land', land,
                'kommentar', kommentar
            )
        ) AS grupperade_rader
    FROM 
        transactions
    GROUP BY 
        motkonto;
`;

  data = query.rows;

  return NextResponse.json({ data }, { status: 200 });
}
