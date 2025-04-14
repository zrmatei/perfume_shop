import React from "react";
import { Link } from "react-router";

const brands = ['Dior', 'Chanel', 'Tom Ford', 'Parfums de Marly'];


function Home() {
    return(
        <div>
            <h1>Select a perfume</h1>
            {brands.map((b) => {
                const formattedName = b.replaceAll(' ', '-');
                return (
                    <Link key={b} to={`/brand/${formattedName}`}>
                        <button>{b}</button>
                    </Link>
                )
            })}
        </div>
    );
}


export default Home;