import React from "react";
import perfumes from "../data/perfumes";
import "../css/brandList.css";

function PerfumeList() {
  const uniqueBrands = Array.from(new Set(perfumes.map(p => p.brand))).sort();

  return (
    <div className="perfumeList">
      <h2>Brands</h2>
      <div className="brandListContainer">
        {uniqueBrands.map((brand, index) => (
          <div key={index} className="brandItem">
            {brand}
          </div>
        ))}
      </div>
      <h3>Show More</h3>
    </div>
  );
}

export default PerfumeList;
