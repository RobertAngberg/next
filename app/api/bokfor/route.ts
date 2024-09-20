import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse form data from the request
    const data = await request.formData();

    // Extract form fields
    const transaktionsdatum = data.get("transaktionsdatum")?.toString() || "";
    const kommentar = data.get("kommentar")?.toString() || "";
    const kontonummer = data.get("kontonummer")?.toString() || "";
    const kontobeskrivning = data.get("kontobeskrivning")?.toString() || "";
    const kontotyp = data.get("kontotyp")?.toString() || "";
    const belopp = parseFloat(data.get("belopp")?.toString() || "0");
    const moms = parseFloat(data.get("moms")?.toString() || "0");
    const beloppUtanMoms = parseFloat(data.get("beloppUtanMoms")?.toString() || "0");

    // Get the file's name from the form data
    const fil = data.get("fil") as File | null;
    const filename = fil ? fil.name : "";

    // Begin SQL transaction
    await sql`BEGIN;`;

    // Insert into Transaktioner and retrieve transaktions_id
    const insertResult = await sql`
      INSERT INTO Transaktioner (transaktionsdatum, kontobeskrivning, kontotyp, belopp, fil, kommentar)
      VALUES (${transaktionsdatum}, ${kontobeskrivning}, ${kontotyp}, ${belopp}, ${filename}, ${kommentar})
      RETURNING transaktions_id;
    `;
    const transaktionsId: number = insertResult.rows[0].transaktions_id;

    // Retrieve konto_id based on kontonummer from table Konton
    const kontoResult = await sql`SELECT konto_id FROM Konton WHERE kontonummer = ${kontonummer};`;
    const kontoId = kontoResult.rows[0].konto_id;

    // Insert into Transaktionsposter based on kontotyp
    if (kontotyp === "Kostnad") {
      await transPost(sql, transaktionsId, 5, 0, belopp); // Företagskonto
      await transPost(sql, transaktionsId, 4, moms, 0); // Momskonto
      await transPost(sql, transaktionsId, kontoId, beloppUtanMoms, 0); // Kostnadskonto
    } else if (kontotyp === "Intäkt") {
      await transPost(sql, transaktionsId, 5, belopp, 0); // Företagskonto
      await transPost(sql, transaktionsId, 4, 0, moms); // Momskonto
      await transPost(sql, transaktionsId, kontoId, 0, beloppUtanMoms); // Intäktskonto
    }

    // Commit SQL transaction
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
): Promise<void> {
  await sql`
    INSERT INTO Transaktionsposter (transaktions_id, konto_id, debet, kredit)
    VALUES (${transaktionsId}, ${kontoId}, ${debet}, ${kredit});
  `;
}

////////////////////////////////////////////////////////
// Auto-complete for searching words in the database
////////////////////////////////////////////////////////

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams.get("q");

  if (params !== null && params.trim() !== "") {
    const query = await sql`SELECT * FROM konton WHERE sökord LIKE '%' || ${params} || '%';`;
    const data = query.rows[0];

    return NextResponse.json({ data }, { status: 200 });
  }

  return NextResponse.json(
    {
      message: "Unhandled error, please try again.",
    },
    { status: 500 }
  );
}
