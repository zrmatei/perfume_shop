import React from "react";
import { useParams } from "react-router";
import perfumes from "../data/perfumes";
import PerfumeCard from "../components/PerfumeCard";


function Brand() {
    const {brandName} = useParams();
    const brandConverter = brandName.replaceAll('-', ' ').toUpperCase();
    const filtered = perfumes.filter((p) => p.brand.toUpperCase() === brandConverter);

    return(
        <div>
            <h2 className="perfumes">Parfumuri {brandConverter}</h2>
            <div className="gridContainer" >
                {filtered.map((p => (
                    <PerfumeCard
                    key={p.id}
                    image={p.image}
                    brand={p.brand}
                    name={p.name}
                    price={p.price}
                    />
                )))}
            </div>
        </div>
    )
}

export default Brand;