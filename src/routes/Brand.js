import React from "react";
import { useParams } from "react-router";
import perfumes from "../data/perfumes";


function Brand() {
    const {brandName} = useParams();
    const brandConverter = brandName.replaceAll('-', ' ');
    const filtered = perfumes.filter((p) => p.brand === brandConverter);

    return(
        <div>
            <h2>Parfumuri {brandConverter}</h2>
            <ul>
                {filtered.map((p => (
                    <li key={p.id}>{p.name}</li>
                )))}
            </ul>
        </div>
    )
}

export default Brand;