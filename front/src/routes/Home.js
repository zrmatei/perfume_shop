import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import chBanner from '../assets/images/home-banner.avif';
import tfBanner from '../assets/images/tf-banner-home.jpg'
import rBanner from '../assets/images/rouge-banner-home.avif'
import vBanner from '../assets/images/vr-banner-home.webp'


function Home() {
    return(
        <div className="bannerHomeWrapper">

            <div className="bannerHome">
                <img src={chBanner}></img>
                <div className="bannerContainer">
                    <Link className="brandName" to="/brand/chrome-hearts"><h2> ♱ CHROME <span className="underline">HEARTS ♱</span></h2></Link>
                </div>
            </div>

            <div className="bannerHome">
                <img src={tfBanner}></img>
                <div className="bannerContainer">
                    <Link className="brandName" to="/brand/tom-ford"><h2>TOM FORD</h2></Link>
                </div>
            </div>

            <div className="bannerHome">
                <img src={rBanner}></img>
                <div className="bannerContainer">
                    <Link className="brandName" to="/brand/maison-francis-kurkdjian"><h2>Maison Francis Kurkdjian</h2></Link>
                </div>
            </div>

            <div className="bannerHome">
                <img src={vBanner}></img>
                <div className="bannerContainer">
                    <Link className="brandName" to="/brand/viktor-rolf"><h2>Viktor & Rolf</h2></Link>
                </div>
            </div>

        </div>
    );
}


export default Home;