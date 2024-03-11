export default function FrontCard({ title, data }: FrontCardProps) {
  return (
    <div className="border-4 sm:w-full sm:mx-0 bg-cyan-950 rounded-xl md:mx-10">
      <div className="p-5 text-4xl font-bold text-white">{title}</div>
      <div className="p-6 text-2xl font-bold bg-white text-sky-950">{data}</div>
    </div>
  );
}
