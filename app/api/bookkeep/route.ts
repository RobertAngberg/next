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
    titel,
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

  try {
    await sql`
        INSERT INTO transactions (Fil, Verifikationsdatum, Inkomst_utgift,
          Företagskonto, Motkonto, Momskonto, Belopp, Land, Titel, Kommentar)
          VALUES (${fil instanceof File ? (fil as File).name : null}, 
        ${String(verifikationsdatum)}, 
        ${String(radioInkomstUtgift)}, 
        ${String(företagsKonto)}, 
        ${String(motkonto)}, 
        ${String(momsKonto)}, 
        ${String(belopp)}, 
        ${String(land)}, 
        ${String(titel)}, 
        ${String(kommentar)})`;
  } catch (error) {
    console.error("Fel:", error);
  }

  return NextResponse.json({
    message: "Data received successfully",
  });
}

////////////////////////////////////////////////////////
// Auto-complete search for account numbers
////////////////////////////////////////////////////////

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

  if (params !== null && params.trim() !== "") {
    const query =
      await sql`SELECT * FROM bas WHERE ord LIKE '%' || ${params} || '%';`;

    const data = query.rows[0];

    return NextResponse.json({ data }, { status: 200 });
  }
}
