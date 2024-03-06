import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();

  // Skapar key-value pairs från FormData
  const {
    file,
    radioInkomstUtgift,
    konto1,
    konto2,
    konto3,
    belopp,
    land,
    datum,
    titel,
    kommentar,
  } = Object.fromEntries(data);

  // TS - Detta för att file kan vara string eller File
  if (file instanceof File) {
    // Ladda upp filen till servern - public/assets
    const tempPath = file.name;
    const uploadsDir = path.join(process.cwd(), "public", "assets");
    const targetPath = path.join(uploadsDir, file.name);

    fs.copyFile(tempPath, targetPath, (err) => {
      if (err) {
        console.error("Error copying file:", err);
      }
    });
  }

  try {
    await sql`
        INSERT INTO test (Fil, Inkomst_utgift, konto1, konto2, konto3, 
          belopp, land, datum, titel, kommentar)
          VALUES (${file instanceof File ? (file as File).name : null}, 
        ${String(radioInkomstUtgift)}, 
        ${Number(konto1)}, 
        ${Number(konto2)}, 
        ${Number(konto3)}, 
        ${Number(belopp)}, 
        ${String(land)}, 
        ${String(datum)}, 
        ${String(titel)}, 
        ${String(kommentar)})`;
  } catch (error) {
    console.error("Error inserting data:", error);
  }

  return NextResponse.json({
    message: "Data received successfully",
  });
}

////////////////////////////////////////////////////////

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams.get("q");

  if (params !== null && params.trim() !== "") {
    const query = await sql`
      SELECT * FROM bas WHERE ord LIKE '%' || ${params} || '%';
    `;

    const data = query.rows[0];

    return NextResponse.json({ data }, { status: 200 });
  }
}
