import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import formidable, { Fields, Files, File } from "formidable";
import fs from "fs";
import path from "path";

// Utility function to parse the form data using formidable
const parseForm = async (request: NextRequest): Promise<{ fields: Fields, files: Files }> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "assets"),
      keepExtensions: true,
    });

    form.parse(request as any, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export async function POST(request: NextRequest) {
  try {
    // Parse the form data using formidable
    const { fields, files } = await parseForm(request);

    // Extract data from the parsed fields
    const transaktionsdatum: string = fields.transaktionsdatum?.toString() || "";
    const kommentar: string = fields.kommentar?.toString() || "";
    const kontonummer: string = fields.kontonummer?.toString() || "";
    const kontobeskrivning: string = fields.kontobeskrivning?.toString() || "";
    const kontotyp: string = fields.kontotyp?.toString() || "";
    const belopp: number = parseFloat(fields.belopp?.toString() || "0");
    const moms: number = parseFloat(fields.moms?.toString() || "0");
    const beloppUtanMoms: number = parseFloat(fields.beloppUtanMoms?.toString() || "0");
    const file = Array.isArray(files.fil) ? files.fil[0] : files.fil;

    // Check if file exists and move it to the desired location
    if (file) {
      const targetPath = path.join(process.cwd(), "public", "assets", file.newFilename || file.originalFilename || "");
      fs.renameSync(file.filepath, targetPath);
    }

    // Begin SQL transaction
    await sql`BEGIN;`;

    // Insert into Transaktioner and retrieve transaktions_id
    const insertResult = await sql`
      INSERT INTO Transaktioner (transaktionsdatum, kontobeskrivning, kontotyp, belopp, fil, kommentar)
      VALUES (${transaktionsdatum}, ${kontobeskrivning}, ${kontotyp}, ${belopp}, ${file?.newFilename || ""}, ${kommentar})
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
