import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import images from "../data/images";
import PerfumeCard from "../components/PerfumeCard";

function Brand() {
    const {brandName} = useParams();
    const brandConverter = brandName.replaceAll('-', ' ').toUpperCase();
    const [filtered, setFiltered] = useState([])
    
    useEffect(() => {
      const fetchPerfumes = async () => {
        try {
          const res = await fetch("http://localhost:8081/info-perfumes");
          const data = await res.json();
          const finalData = data.filter((p) => p.brand.toUpperCase() === brandConverter)
          .map((p) => {
            const key = `${p.brand}|${p.prod_name}`;
            return {...p, image: images[key] || null}
          });
          setFiltered(finalData);
        } catch (err) {
          console.error("Loading perfumes failed");
        }
      };
      fetchPerfumes()
    }, [brandConverter]);

    return(
        <div>
            <h2 className="perfumes">Parfumuri {brandConverter}</h2>
            <div className="gridContainer" >
                {filtered.map((p => (
                    <PerfumeCard
                    key={p.id}
                    id={p.id}
                    image={p.image}
                    brand={p.brand}
                    prod_name={p.prod_name}
                    price={p.price}
                    stock={p.stock}
                    />
                )))}
            </div>
        </div>
    )
}

export default Brand;