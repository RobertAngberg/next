"use server";

import { QueryResultRow, sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// export default async function formAction(formData: FormData) {
//   await sql`INSERT INTO test (Fil) VALUES (${formData.get("name") as string})`;
//   revalidatePath("/");
// }