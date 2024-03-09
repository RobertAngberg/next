import Card from "./Card";
import { sql } from "@vercel/postgres";

export default async function Home() {
  // Alla inkomster summerat
  const dataInkomst = await sql`
  SELECT SUM(belopp) AS totalBelopp FROM test 
  WHERE Inkomst_utgift = 'Inkomst';`;
  const totalInkomst: number = dataInkomst.rows[0].totalbelopp;

  // Alla utgifter summerat
  const dataUtgift = await sql`
  SELECT SUM(belopp) AS totalBelopp FROM test 
  WHERE Inkomst_utgift = 'Utgift';`;
  const totalUtgift: number = dataUtgift.rows[0].totalbelopp;

  // Resultat = inkomst - utgift
  const totalResultat: number = totalInkomst - totalUtgift;

  return (
    <main className="items-center p-10 text-center bg-slate-950">
      <div className="flex">
        <Card title="Inkomster" data={totalInkomst || 0} />
        <Card title="Utgifter" data={totalUtgift || 0} />
        <Card title="Resultat" data={totalResultat || 0} />
      </div>
    </main>
  );
}
