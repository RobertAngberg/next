function TopSection({ setYear }: TopSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center md:flex-row md:text-left">
      <h1 className="mb-4 text-4xl font-bold md:mb-0 md:mr-4">Grundbok</h1>
      <div>
        <select
          className="px-4 py-2 font-bold text-white rounded cursor-pointer bg-cyan-600 hover:bg-cyan-700"
          id="year"
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </div>
  );
}

export { TopSection };
