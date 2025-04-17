import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import profile from "../assets/profile.svg";
import search from "../assets/search.svg";
import showmore from "../assets/menu-grid-o.svg";
import fidelity from "../assets/card-clubs.svg";
import HeartIcon from "./HeartIcon";
import BagIcon from "./BagIcon";
import PerfumeList from "./BrandList";

function Layout() {
  {
    /* TODO: CAND ADAUG IN PRODUS IN WISHLIST SA SE UMPLE SI INIMA, NU DOAR CONTUR */
  }
  const [liked, setLiked] = useState(false);
  const [pop, setPop] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  const popBag = () => {
    setPop(true);
    setTimeout(() => setPop(false), 500);
  };

  return (
    <div>
      <div className="header">

        {/*TODO LOYALTY INTERFACE + SHOW BRANDS MESAJ GEN ON/OFF CONTOR / SWITCH */}
        <div id="barLeft" className="fidelityContainer">
          <a href="/loyalty" className="fidelityLink">
            <img src={fidelity} alt="fidelity card" id="fidelity" />
            <span className="fidelityText">LOYALTY PROGRAME</span>
          </a>
          <div className="brandsBox" onClick={() => setShowBrands(!showBrands)}>
            <img src={showmore} alt="brands icon" />
            <span className="showBrandsText">BRANDS</span>
          </div>
        </div>

        <div id="barCenter">
          <a href="/">
            <img src={logo} alt="text logo" />
          </a>
        </div>

        <div id="barRight">
          <button className="button">
            <img src={search} alt="search product logo" />
          </button>
          <button className="button">
            <img src={profile} alt="profile logo" />
          </button>
          <button
            className="button"
            id="heart"
            onClick={() => setLiked(!liked)}
          >
            <HeartIcon filled={liked} />
          </button>
          <button className="button" onClick={popBag}>
            <div className={pop ? "pop" : ""}>
              <BagIcon />
            </div>
          </button>
        </div>

      </div>

      {showBrands && (
        <div className="overlay">
          <button
            className="closeBtn"
            onClick={() => setShowBrands(!showBrands)}
          >
            CLOSE
          </button>
          <PerfumeList />
        </div>
      )}
      <Outlet />

      <div className="footer">
        <p> &copy; VOID 2025</p>
      </div>

    </div>
  );
}

export default Layout;
