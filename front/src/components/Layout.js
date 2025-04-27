import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import profile from "../assets/profile.svg";
import search from "../assets/search.svg";
import showmore from "../assets/menu-grid-o.svg";
import fidelity from "../assets/card-clubs.svg";
import BrandList from "./BrandList";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import "../css/layout.css";
import { useWishlist } from "./auth/WishlistContext";
import { AuthContext } from "./auth/AuthContext";
import WishlistOverlay from "./WishlistOverlay";
import Cart from "./Cart";
import { useCart } from "./auth/CartContext";

function Layout() {
  const [showBrands, setShowBrands] = useState(false);
  const [showPerfumes, setShowPerfumes] = useState(false);
  const { wishlist } = useWishlist();
  const [showWishlistOverlay, setShowWishlistOverlay] = useState(false);
  const { profileVisible, openProfile, closeProfile} = useContext(AuthContext);
  const {toggleCartItem} = useCart();

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
          <button
            className="button"
            onClick={() => setShowPerfumes(!showPerfumes)}
          >
            <img src={search} alt="search product logo" />
          </button>
          <button
            className="button"
            onClick={() => openProfile()}
          >
            <img src={profile} alt="profile logo" />
          </button>
          <WishlistOverlay/>
          <Cart/>
        </div>
      </div>
      {profileVisible && <Profile visible={true} onClose={closeProfile}/>}
      {showBrands && (
        <div className="overlay">
          <button
            className="closeBtn"
            onClick={() => setShowBrands(!showBrands)}
          >
            CLOSE
          </button>
          <BrandList closeOverlay={() => setShowBrands(!showBrands)} />
        </div>
      )}

      <SearchBar
        visible={showPerfumes}
        onClose={() => setShowPerfumes(false)}
      />


      <Outlet />

      <div className="footer">
        <p> &copy; VOID 2025</p>
      </div>
    </div>
  );
}

export default Layout;
