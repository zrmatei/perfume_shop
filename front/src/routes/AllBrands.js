import PerfumeCard from "../components/PerfumeCard";
import "../css/App.css"
import "../css/brandList.css"
import perfumes from "../data/perfumes";
import { useParams } from "react-router";
import { useState } from "react";

function AllBrands() {
    const [sortedPerfumes, setSortedPerfumes] = useState([...perfumes]);


    const sorter = (e) =>{
    if(e.target.value === "asc-by-name"){
        const sortByNameASC = [...perfumes].sort((a, b) => a.name.localeCompare(b.name))
        setSortedPerfumes(sortByNameASC)
    }else if(e.target.value === "asc-by-price"){
        const sortByPriceASC = [...perfumes].sort((a, b) => a.price - b.price)
        setSortedPerfumes(sortByPriceASC)
    }else if(e.target.value === "desc-by-name"){
        const sortByNameDESC = [...perfumes].sort((a, b) => a.name.localeCompare(b.name)).reverse()
        setSortedPerfumes(sortByNameDESC)
    }else{
        const sortByPriceDESC = [...perfumes].sort((a, b) => a.price - b.price).reverse()
        setSortedPerfumes(sortByPriceDESC)
    }
}

    return(
        <div>
            <h2 className="perfumes">ALL BRANDS</h2>
            <select id="sort-options" onChange={sorter}>
                <option>Sorting method..</option>
                <option value="asc-by-name">ASC by name</option>
                <option value="asc-by-price">ASC by price</option>
                <option value="desc-by-name">DESC by name</option>
                <option value="desc-by-price">DESC by price</option>
            </select>
            <div className="gridContainer">
                {sortedPerfumes.map((p => (
                    <PerfumeCard
                    key={p.id}
                    id={p.id}
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

export default AllBrands;