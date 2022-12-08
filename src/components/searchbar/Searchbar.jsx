import React, { useState } from "react";
import "./Searchbar.css";
import { BiSearch } from "react-icons/bi";

export const Searchbar = ({ onSearch }) => {
  const [data, setData] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    onSearch(data);
  };

  return (
    <div className="searchbar-container">
      <input
        className="searchbar-input"
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            e.preventDefault();
            onSearch(data);
          }
        }}
        onChange={(e) => setData(e.target.value)}
      />
      <button className="searchbar-button" onClick={(e) => handleClick(e)}>
        <BiSearch />
        Search
      </button>
    </div>
  );
};
