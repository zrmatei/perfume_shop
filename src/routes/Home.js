import React from "react";
import { Link } from "react-router";
import "../css/home.css";
import banner from '../assets/home-banner.avif';

const brands = ['Dior', 'Chanel', 'Tom Ford', 'Parfums de Marly'];


function Home() {
    return(
        <div>
            <div className="bannerHome">
                <img src={banner}></img>
                <div className="bannerContainer">
                    <div><h2>FOR <span className="underline">MEN</span></h2></div>
                    <div><h2>FOR <span className="underline">WOMEN</span></h2></div>
                </div>
            </div>
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