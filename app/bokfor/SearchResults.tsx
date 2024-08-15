function SearchResults({ data, onClick }: SearchResultsProps) {
  return (
    <div id="searchResults">
      <div
        className="rounded mt-2 text-xl bg-white w-full text-black font-bold py-3 px-4 mb-4 hover:bg-gray-300 hover:cursor-pointer text-xl"
        onClick={() => onClick(data)}
      >
        &#10003; &nbsp; {data.kontonummer} - {data.kontobeskrivning}
        <p className="p-2 text-base">Sökord:</p>
        <div className="font-normal text-base">{data.sökord}</div>
      </div>
    </div>
  );
}

export { SearchResults };
