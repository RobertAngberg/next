import React, { useState } from "react";
import { useFetchGet } from "../hooks/useFetchGet";
import { SearchResults } from "./SearchResults";

function AccountSearch({
  setCurrentStep,
  searchText,
  setSearchText,
  setKontonummer,
  setKontotyp,
  setKontobeskrivning,
}: AccountSearchProps) {
  const [showSearchResults, setShowSearchResults] = useState(true);
  const { fetchData } = useFetchGet(`api/bokfor?q=${searchText}`);

  const handleSearchAccNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim().toLowerCase();
    setSearchText(inputValue);
  };

  const searchResultClick = (item: FetchDataItem): void => {
    setKontonummer(item.kontonummer);
    setKontotyp(item.kontotyp);
    setKontobeskrivning(item.kontobeskrivning);
    setCurrentStep(2);
    setShowSearchResults(false);
  };

  return (
    <div className="w-full">
      <label className="font-bold text-2xl" htmlFor="search-account-number">
        Sök bland förval
      </label>
      <input
        className="w-full mt-4 p-3 rounded-lg text-black border-slate-950 border-2"
        type="text"
        id="search-account-number"
        name="searchInput"
        autoComplete="off"
        value={searchText}
        onChange={handleSearchAccNum}
      />

      {/* Div med sökresultat */}
      {showSearchResults && fetchData?.data && searchText && (
        <SearchResults data={fetchData.data} onClick={searchResultClick} />
      )}
    </div>
  );
}

export { AccountSearch };
