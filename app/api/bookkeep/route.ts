import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();

  // Skapar key-value pairs från FormData
  let {
    fil,
    transaktionsdatum,
    kommentar,
    kontonummer,
    kontobeskrivning,
    kontotyp,
    belopp,
    moms,
    beloppUtanMoms,
  } = Object.fromEntries(data);

  // Spara filen
  if (fil instanceof File) {
    // Ladda upp filen till servern inuti public/assets
    const uploadsDir = path.join(process.cwd(), "public", "assets");
    const targetPath = path.join(uploadsDir, fil.name);
    // Läser filens data som en ArrayBuffer och skriver den till targetPath
    const fileData = await fil.arrayBuffer();
    fs.writeFileSync(targetPath, Buffer.from(fileData));
  }

  try {
    await sql`BEGIN;`;
    const result = await sql`
        INSERT INTO Transaktioner (transaktionsdatum, kontobeskrivning, kontotyp, belopp, fil, kommentar)
        VALUES (${String(transaktionsdatum)}, 
        ${String(kontobeskrivning)}, 
        ${String(kontotyp)}, 
        ${String(belopp)}, 
        ${(fil as File).name}, 
        ${String(kommentar)})
        RETURNING transaktions_id;
    `;

    const transaktionsId = result.rows[0].transaktions_id;

    // Hämta konto_id baserat på ${String(kontonummer)} för att kunna skapa en transaktionspost
    const kontoResult = await sql`
        SELECT konto_id FROM Konton WHERE kontonummer = ${String(kontonummer)};
    `;

    // Exempel: Om ${String(kontonummer)} är 6230 så kommer kontoResult.rows[0].konto_id vara 2
    const kontoId = kontoResult.rows[0].konto_id;

    ////////////////////////////////////////////////
    //  Kostnad
    ////////////////////////////////////////////////
    if (kontotyp === "Kostnad") {
      // Rad 1, Företagskontot - konto 5 är ju nu 1930 företagskonto
      await sql`
    INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
    VALUES (${transaktionsId}, 5, 0.00, ${Number(belopp)});
  `;
      // Rad 2, Momskontot - konto 4 är just nu 2610 utgående moms 25%
      await sql`
    INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
    VALUES (${transaktionsId}, 4, ${Number(moms)}, 0.00);
  `;
      // Rad 3, Kostnadskontot
      await sql`
    INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
    VALUES (${transaktionsId}, ${kontoId}, ${Number(beloppUtanMoms)}, 0.00);
  `;
      ////////////////////////////////////////////////
      //  Intäkt
      ////////////////////////////////////////////////
    } else if (kontotyp === "Intäkt") {
      // Rad 1, Företagskontot
      await sql`
    INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
    VALUES (${transaktionsId}, 5, ${Number(belopp)}, 0.00);
  `;
      // Rad 2, Momskontot
      await sql`
    INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
    VALUES (${transaktionsId}, 4, 0.00, ${Number(moms)});
  `;
      // Rad 3, Intäktskontot
      await sql`
    INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
    VALUES (${transaktionsId}, ${kontoId}, 0.00, ${Number(beloppUtanMoms)});
  `;
    }

    await sql`COMMIT;`;
  } catch (error) {
    console.error("Fel:", error);
    await sql`ROLLBACK;`;
  }

  return NextResponse.json({
    message: "Data received successfully",
  });
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
