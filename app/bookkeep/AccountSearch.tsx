"use client";

import React, { useState } from "react";
import useFetchData from "../hooks/useFetchGet";

const AccountSearch: React.FC<AccountSearchProps> = ({
  radio,
  searchText,
  setSearchText,
}) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  // // Om man inte använder shouldFetch så kommer den att fetcha data varje tangenttryck
  // const { data } = useFetchData(
  //   `searchAccNum&account=${searchText}`,
  //   shouldFetch
  // );

  // console.log("Från AccountSearch: " + data);

  const handleSearchAccNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!radio) {
      e.preventDefault();
      alert("Vänligen välj inkomst eller utgift först");
    } else {
      const inputValue = e.target.value;
      setSearchText(inputValue);
      if (inputValue.length >= 4) {
        setShouldFetch(true); // Börja fetcha
      } else {
        setShouldFetch(false); // Resetta
      }
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="search-account-number">Sök typ av inkomst/utgift:</label>
      <input
        className="w-full mb-4 p-2 border-solid border-2 border-gray-600 rounded text-black"
        type="text"
        id="search-account-number"
        name="searchInput"
        value={searchText}
        onChange={handleSearchAccNum}
      />
      <div id="searchResults"></div>
    </div>
  );
};

export default AccountSearch;
