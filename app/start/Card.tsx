function Card({ title, data }: FrontCardProps) {
  return (
    <div className="mb-4 border-4 bg-cyan-950 rounded-xl sm:w-full sm:mx-0 md:mx-10 md:mb-0">
      <div className="p-5 text-4xl font-bold text-white">{title}</div>
      <div className="p-6 text-2xl font-bold bg-white text-sky-950">{data.toFixed(2)}</div>
    </div>
  );
}

export { Card };