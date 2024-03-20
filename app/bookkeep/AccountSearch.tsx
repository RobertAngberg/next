"use client";

import { useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

const AccountSearch: React.FC<AccountSearchProps> = ({
  radioInkomstUtgift,
  searchText,
  setSearchText,
  setMotkonto,
}) => {
  const [showSearchResults, setShowSearchResults] = useState(true);

  const { fetchData } = useFetchGet(`api/bookkeep?q=${searchText}`);

  const checkRadioSelected = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!radioInkomstUtgift) {
      event.preventDefault();
      alert("Vänligen välj inkomst eller utgift först");
      return;
    }
  };

  const handleSearchAccNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setSearchText(inputValue);
  };

  function searchResultClick(item: FetchDataItem): void {
    setMotkonto(item.konto_nummer);
    setShowSearchResults(false);
  }

  return (
    <div className="w-full">
      <label htmlFor="search-account-number">Sök typ av inkomst/utgift:</label>
      <input
        className="w-full mb-4 p-2 border-solid border-2 border-gray-600 rounded text-black"
        type="text"
        id="search-account-number"
        name="searchInput"
        autoComplete="off"
        value={searchText}
        onChange={handleSearchAccNum}
        onClick={checkRadioSelected}
      />

      {/* Div som dyker upp när man söker efter konto */}
      {showSearchResults && fetchData?.data && (
        <div id="searchResults">
          {fetchData?.data && (
            <div
              className="bg-white w-full text-black font-bold py-3 px-4 mb-4 hover:bg-gray-300 hover:cursor-pointer"
              onClick={() => searchResultClick(fetchData.data)}
            >
              {fetchData.data.konto_nummer} - {fetchData.data.konto_namn}
              <div className="font-normal">{fetchData.data.ord}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSearch;
