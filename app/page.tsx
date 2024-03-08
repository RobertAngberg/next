import HomeChart from "./home/HomeChart";
import ThreeCards from "./home/ThreeCards";

export default async function Home() {
  return (
    <main className="items-center p-10 text-center bg-slate-950">
      <ThreeCards />
      <HomeChart />
    </main>
  );
}
