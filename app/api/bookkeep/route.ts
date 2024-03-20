import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();

  // Skapar key-value pairs från FormData
  let {
    fil,
    verifikationsdatum,
    radioInkomstUtgift,
    företagsKonto,
    motkonto,
    momsKonto,
    belopp,
    land,
    kommentar,
  } = Object.fromEntries(data);

  // TS - Detta för att file kan vara string eller File
  if (fil instanceof File) {
    // Ladda upp filen till servern inuti public/assets
    const uploadsDir = path.join(process.cwd(), "public", "assets");
    const targetPath = path.join(uploadsDir, fil.name);
    // Läser filens data som en ArrayBuffer och skriver den till targetPath
    const fileData = await fil.arrayBuffer();
    fs.writeFileSync(targetPath, Buffer.from(fileData));
  }

  ////////////////////////////////////////////////
  try {
    await sql`BEGIN;`;

    // WTF med beskrivning? Ta det senare, gör nu debet och kredit, hur fan det nu ska funka
    // Det måste avgöras på frontend och sen ta det med ${String(debet)} och ${String(kredit)}
    // ATM har jag inget som typ avgör debet och kredit på frontend
    // Talar för att göra det med mallar/förval tror jag

    const result = await sql`
        INSERT INTO Transaktioner (datum, beskrivning, fil, kommentar)
        VALUES (${String(verifikationsdatum)}, 'asdffff', ${(fil as File).name}, ${String(kommentar)})
        RETURNING transaktions_id;
    `;

    const transaktionsId = result.rows[0].transaktions_id;

    // Hämta konto_id baserat på ${String(motkonto)}, det behövs för att kunna skapa en transaktionspost
    const kontoResult = await sql`
        SELECT konto_id FROM Konton WHERE konto_nummer = ${String(motkonto)};
    `;
    // Exempel: Om ${String(motkonto)} är 6230 så kommer kontoResult.rows[0].konto_id vara 1
    const kontoId = kontoResult.rows[0].konto_id;

    await sql`
        INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
        VALUES (${transaktionsId}, ${kontoId}, 1000.00, 0.00);
    `;

    await sql`COMMIT;`;
  } catch (error) {
    console.error("Fel:", error);
    await sql`ROLLBACK;`;
  }

  return NextResponse.json({
    message: "Data received successfully",
  });

  ////////////////////////////////////////////////

  // try {
  //   await sql`
  //       INSERT INTO transactions (Fil, Verifikationsdatum, Inkomst_utgift,
  //         Företagskonto, Motkonto, Momskonto, Belopp, Land, Kommentar)
  //         VALUES (${fil instanceof File ? (fil as File).name : null},
  //       ${String(verifikationsdatum)},
  //       ${String(radioInkomstUtgift)},
  //       ${String(företagsKonto)},
  //       ${String(motkonto)},
  //       ${String(momsKonto)},
  //       ${String(belopp)},
  //       ${String(land)},
  //       ${String(kommentar)})`;
  // } catch (error) {
  //   console.error("Fel:", error);
  // }

  // return NextResponse.json({
  //   message: "Data received successfully",
  // });
}

////////////////////////////////////////////////////////
// Auto-complete för att söka efter ord i databasen
////////////////////////////////////////////////////////

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

  if (params !== null && params.trim() !== "") {
    const query =
      await sql`SELECT * FROM konton WHERE sökord LIKE '%' || ${params} || '%';`;

    const data = query.rows[0];

    return NextResponse.json({ data }, { status: 200 });
  }
}
