import React from "react";
import perfumes from "../data/perfumes";
import "../css/brandList.css";
import { Link, useNavigate } from "react-router";

function BrandList({closeOverlay}) {
  const uniqueBrands = Array.from(new Set(perfumes.map((p) => p.brand))).sort();
  const navigate = useNavigate();

  return (
    <div className="perfumeList">
      <h2>Brands</h2>
      <div className="brandListContainer">
        {uniqueBrands.map((brand, index) => {
          const brandPerfume = brand.toLowerCase().replaceAll(" ", "-");

          return (
            <div key={index} className="brandItem">
              <Link to={`/brand/${brandPerfume}`} onClick={closeOverlay}>{brand}</Link>
            </div>
          );
        })}
      </div>
      <h3 onClick={() => {closeOverlay(); navigate("/brands");}}>Show More</h3>
    </div>
  );
}

export default BrandList;
