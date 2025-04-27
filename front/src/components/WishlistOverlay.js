import React, { useEffect, useState, useContext } from "react";
import { useWishlist } from "./auth/WishlistContext";
import { AuthContext } from "./auth/AuthContext";
import HeartIcon from "./HeartIcon"; 
import "../css/wishlist.css";

function WishlistOverlay() {
  const { wishlist } = useWishlist();
  const { openProfile, isLogged } = useContext(AuthContext);
  const [showOverlay, setShowOverlay] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleWishlist = (i) => {
    const token = localStorage.getItem("token");
    if (!token) {
      openProfile();
      return;
    }else{
      // DE FACUT LOGICA LA ASTA: CAND SUNT LOGAT MUT IN COS SI ARAT ACOLO PRODUSUL, ITEM-UL IESE DIN WISH
      console.log("Mutat în coș:", i);
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
