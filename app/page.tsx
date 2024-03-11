import HomeChart from "./home/HomeChart";
import ThreeCards from "./home/ThreeCards";

export default async function Home() {
  return (
    <main className="items-center text-center bg-slate-950 p-0 md:p-10">
      <ThreeCards />
      <HomeChart />
    </main>
  );
}
