import PerfumeCard from "../components/PerfumeCard";
import "../css/App.css"
import "../css/brandList.css"
import images from "../data/images";
import { useEffect, useState } from "react";

function AllBrands() {
  const [perfumes, setPerfumes] = useState([]);
  const [sortedPerfumes, setSortedPerfumes] = useState([]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const res = await fetch("http://localhost:8081/info-perfumes");
        const data = await res.json();

        const finalData = data.map(p => {
            const key = `${p.brand}|${p.prod_name}`
            return {...p, image: images[key] || null}
        })
        setPerfumes(finalData);
        setSortedPerfumes(finalData);
      } catch (err) {
        console.error("Error loading perfumes", err);
      }
    };
    fetchPerfumes();
  }, []);

  const sorter = (e) => {
    const value = e.target.value;
    let sorted = [...perfumes];

    if (value === "asc-by-name") {
      sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (value === "asc-by-price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "desc-by-name") {
      sorted.sort((a, b) => b.brand.localeCompare(a.brand));
    } else if (value === "desc-by-price") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setSortedPerfumes(sorted);
  };

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
                    prod_name={p.prod_name}
                    price={p.price}
                    stock={p.stock}
                    />
                )))}
            </div>
        
        </div>
    )
}

export default AllBrands;