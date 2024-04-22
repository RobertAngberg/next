import { QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let data: QueryResultRow[];

  const query = await sql`
SELECT
    k.konto_id,
    k.kontonummer,
    k.kontobeskrivning,
    t.transaktions_id,
    t.transaktionsdatum,
    t.kontobeskrivning AS trans_kontobeskrivning,
    t.belopp,
    t.kommentar,
    tp.transaktionspost_id,
    tp.debet,
    tp.kredit
FROM
    konton k
JOIN
    transaktionsposter tp ON k.konto_id = tp.konto_id
JOIN
    transaktioner t ON tp.transaktions_id = t.transaktions_id
ORDER BY
    k.konto_id,
    t.transaktionsdatum;
`;

  data = query.rows;

  return NextResponse.json(data);
}
