import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import profile from "../assets/profile.svg";
import search from "../assets/search.svg";
import showmore from "../assets/menu-grid-o.svg";
import fidelity from "../assets/card-clubs.svg";
import BrandList from "./BrandList";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import "../css/layout.css";
import { AuthContext } from "./auth/AuthContext";
import WishlistOverlay from "./WishlistOverlay";
import Cart from "./Cart";

function Layout() {
  const [showBrands, setShowBrands] = useState(false);
  const [showPerfumes, setShowPerfumes] = useState(false);
  const { profileVisible, setProfileVisible, isAdmin} = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLoyalty = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if(!token){
        setProfileVisible(true)
    }else{
        navigate("/loyalty")
    }
  }

  return (
    <div>
      <video autoPlay muted loop className="bg-video">
        <source src={require("../assets/flowers-blooming.mp4")} type="video/mp4"></source>
      </video>
      <div className="header">
        {/*TODO LOYALTY INTERFACE + SHOW BRANDS MESAJ GEN ON/OFF CONTOR / SWITCH */}
        <div id="barLeft" className="fidelityContainer">
          <a href="/loyalty" className="fidelityLink" onClick={handleLoyalty}>
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
            onClick={() => setProfileVisible(!profileVisible )}
          >
            <img src={profile} alt="profile logo" />
          </button>
          <WishlistOverlay />
          <Cart/>
          {isAdmin && (
            <button className="admin-panel" onClick={() => navigate("/admin")}>
            Admin Panel
          </button>
          )}
        </div>
      </div>
      {profileVisible && <Profile visible={true} onClose={() => setProfileVisible(false)}/>}
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
