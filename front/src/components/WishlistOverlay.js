import React, { useEffect, useState, useContext } from "react";
import { useWishlist, WishlistContext } from "./auth/WishlistContext";
import { AuthContext } from "./auth/AuthContext";
import HeartIcon from "./HeartIcon"; 
import "../css/wishlist.css";
import { useNavigate } from "react-router-dom";

function WishlistOverlay() {
  const { wishlist } = useWishlist();
  const { setProfileVisible } = useContext(AuthContext);
  const [showOverlay, setShowOverlay] = useState(false);
  const [liked, setLiked] = useState(false);
  const {toggleWishlistItem, clearWishlist} = useContext(WishlistContext);
  
  const navigate = useNavigate()
  const handleWishlist = (i) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowOverlay(false)
      setProfileVisible(true)
      return;
    }else{
      toggleWishlistItem(i);
    }
  };

  useEffect(() => {
    showOverlay
      ? document.body.classList.add("stopScroll")
      : document.body.classList.remove("stopScroll");
  }, [showOverlay]);

  return (
    <>
      <button
        className="button"
        id="heart"
        onClick={() => {
          setLiked(!liked);
          setShowOverlay(true);
        }}
      >
        <HeartIcon filled={liked} />
      </button>

      {showOverlay && (
        <div className="wishlist">
          <div className="wishlistOverlay">
            <div className="wishlistContainer">
              <button className="close-btn" onClick={() => setShowOverlay(false)}>
                X
              </button>

              {wishlist.length > 0 ? (
                wishlist.map((i) => (
                  <div key={i.id} className="wishlistItem">
                    <img src={i.image} alt={i.name} />
                    <p>{i.brand}</p>
                    <h4>{i.name}</h4>
                    <p>{i.price} lei</p>
                    <button
                      className="move-to-cart-btn"
                      onClick={() => handleWishlist(i)}
                    >
                      TO CART
                    </button>
                  </div>
                ))
              ) : (
                <p>Empty Wishlist</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WishlistOverlay;
