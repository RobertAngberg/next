"use client";

import { useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

const AccountSearch: React.FC<AccountSearchProps> = ({
  setCurrentStep,
  searchText,
  setSearchText,
  setKontonummer,
  setKontotyp,
  setKontobeskrivning,
}) => {
  const [showSearchResults, setShowSearchResults] = useState(true);

  const { fetchData } = useFetchGet(`api/bokfor?q=${searchText}`);

  const handleSearchAccNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim().toLowerCase();
    setSearchText(inputValue);
  };

  function searchResultClick(item: FetchDataItem): void {
    setKontonummer(item.kontonummer);
    setKontotyp(item.kontotyp);
    setKontobeskrivning(item.kontobeskrivning);
    setCurrentStep(2);
    setShowSearchResults(false);
  }

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

      {/* Div som dyker upp när man söker efter konto */}
      {showSearchResults && fetchData?.data && searchText && (
        <div id="searchResults">
          {fetchData?.data && (
            <div
              className="rounded mt-2 text-xl bg-white w-full text-black font-bold py-3 px-4 mb-4 hover:bg-gray-300 hover:cursor-pointer text-xl"
              onClick={() => searchResultClick(fetchData.data)}
            >
              &#10003; &nbsp; {fetchData.data.kontonummer} -{" "}
              {fetchData.data.kontobeskrivning}
              <p className="p-2 text-base">Sökord:</p>
              <div className="font-normal text-base">
                {fetchData.data.sökord}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSearch;
