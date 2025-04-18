import React from "react";
import { useParams } from "react-router";
import perfumes from "../data/perfumes";


function Brand() {
    const {brandName} = useParams();
    const brandConverter = brandName.replaceAll('-', ' ').toUpperCase();
    const filtered = perfumes.filter((p) => p.brand.toUpperCase() === brandConverter);

    return(
        <div>
            <h2 className="perfumes">Parfumuri {brandConverter}</h2>
            <ul>
                {filtered.map((p => (
                    <li key={p.id} class="perfumes">{p.name}</li>
                )))}
            </ul>
        </div>
    )
}

export default Brand;