import React, { useState, useEffect } from "react";
import perfumes from "../data/perfumes";

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
                <li key={p.id}>
                  <strong>{p.name}</strong> – {p.brand}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
