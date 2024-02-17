type FrontCardProps = {
  title: string;
  data: number;
};

export default function FrontCard({ title, data }: FrontCardProps) {
  return (
    <div className="w-1/3 items-center m-auto mx-8 max-w-5xl bg-cyan-950 border-4 rounded-xl">
      <div className="text-4xl font-bold p-5 text-white">{title}</div>
      <div className="bg-white text-sky-950 font-bold text-2xl p-6">{data}</div>
    </div>
  );
}
