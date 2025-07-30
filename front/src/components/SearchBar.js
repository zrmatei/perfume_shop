import React, { useState, useEffect } from "react";
import perfumes from "../data/perfumes";
import {Link} from "react-router"
import "../css/layout.css"

function SearchBar({ visible, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (visible) {
      document.body.classList.add("stopScroll");
    } else {
      document.body.classList.remove("stopScroll");
      setSearchTerm("");
      setFilteredResults([]);
    }
  }, [visible]);

  const handleSearch = (e) => {
    const word = e.target.value.toLowerCase();
    setSearchTerm(word);
    if (word.trim() === "") {
      setFilteredResults([]);
      return;
    }
    const filtered = perfumes.filter(
      (p) =>
        p.name.toLowerCase().includes(word) ||
        p.brand.toLowerCase().includes(word)
    );
    setFilteredResults(filtered);
  };

  if (!visible) return null;

  return (
    <div className="overlaySearchBox">
      <div className="overlayContent">
      <input
        type="text"
        className="searchInput"
        placeholder="Search perfumes"
        value={searchTerm}
        onChange={handleSearch}
      />

      {searchTerm && (
        <div className="searchResultsDropdown">
          {filteredResults.length > 0 ? (
            <ul>
              {filteredResults.map((p) => (
                <div key={p.id} className="search-perfumes">
                  <Link to={`/brand/${p.brand}`} onClick={onClose}>{p.name}</Link> – {p.brand}
                </div>
              ))}
            </ul>
          ) : (
            <p>No results</p>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

export default SearchBar;
