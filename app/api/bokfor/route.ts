import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();

  // Gör så här hardcore för att typescript ska sluta klaga
  const fil = data.get("fil");
  const transaktionsdatum = data.get("transaktionsdatum")?.toString() || "";
  const kommentar = data.get("kommentar")?.toString() || "";
  const kontonummer = data.get("kontonummer")?.toString() || "";
  const kontobeskrivning = data.get("kontobeskrivning")?.toString() || "";
  const kontotyp = data.get("kontotyp")?.toString() || "";
  const belopp = parseFloat(data.get("belopp")?.toString() || "0");
  const moms = parseFloat(data.get("moms")?.toString() || "0");
  const beloppUtanMoms = parseFloat(data.get("beloppUtanMoms")?.toString() || "0");

  // Filen
  if (fil instanceof File) {
    const uploadsDir = path.join(process.cwd(), "public", "assets");
    const targetPath = path.join(uploadsDir, fil.name);
    const fileData = await fil.arrayBuffer();
    fs.writeFileSync(targetPath, Buffer.from(fileData));
  }

  try {
    await sql`BEGIN;`;

    // Först insert i Transaktioner och få tillbaka transaktions_id efteråt
    const insertResult = await sql`
            INSERT INTO Transaktioner (transaktionsdatum, kontobeskrivning, kontotyp, belopp, fil, kommentar)
            VALUES (${transaktionsdatum}, ${kontobeskrivning}, ${kontotyp}, 
              ${belopp}, ${fil instanceof File ? fil.name : ""}, ${kommentar})
            RETURNING transaktions_id;
        `;
    const transaktionsId: number = insertResult.rows[0].transaktions_id;

    // Hämta konto_id för kontonumret i table Konton
    const kontoResult = await sql`SELECT konto_id FROM Konton WHERE kontonummer = ${kontonummer};`;
    const kontoId = kontoResult.rows[0].konto_id;

    // Insert i Transaktionsposter beroende på kontotyp
    if (kontotyp === "Kostnad") {
      await transPost(sql, transaktionsId, 5, 0, belopp); // Företagskonto
      await transPost(sql, transaktionsId, 4, moms, 0); // Momskonto
      await transPost(sql, transaktionsId, kontoId, beloppUtanMoms, 0); // Kostnadskonto
    } else if (kontotyp === "Intäkt") {
      await transPost(sql, transaktionsId, 5, belopp, 0); // Företagskonto
      await transPost(sql, transaktionsId, 4, 0, moms); // Momskonto
      await transPost(sql, transaktionsId, kontoId, 0, beloppUtanMoms); // Intäktskonto
    }

    await sql`COMMIT;`;

    return NextResponse.json({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error:", error);
    await sql`ROLLBACK;`;
    return NextResponse.json({ message: "Failed to process data", error }, { status: 500 });
  }
}

async function transPost(
  sql: any,
  transaktionsId: number,
  kontoId: number,
  debet: number,
  kredit: number
) {
  await sql`
        INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
        VALUES (${transaktionsId}, ${kontoId}, ${debet}, ${kredit});
    `;
}

////////////////////////////////////////////////////////
// Auto-complete för att söka efter ord i databasen
////////////////////////////////////////////////////////

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

  if (params !== null && params.trim() !== "") {
    const query = await sql`SELECT * FROM konton WHERE sökord LIKE '%' || ${params} || '%';`;

    const data = query.rows[0];

    return NextResponse.json({ data }, { status: 200 });
  }

  return NextResponse.json(
    {
      message: "Ohanterat fel, försök igen.",
    },
    { status: 500 }
  );
}
