import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import "../css/cart.css";
import { useCart } from "./auth/CartContext";
import BagIcon from "./BagIcon";
import { useNavigate } from "react-router";

function Cart() {
  const [pop, setPop] = useState(false);
  const { cart, toggleCartItem, clearCart } = useCart();
  const { setProfileVisible } = useContext(AuthContext);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const popBag = () => {
    setPop(true);
    setShowOverlay(true);
    setTimeout(() => setPop(false), 500);
  };

  const handleCart = (i) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token null - guest")
      toggleCartItem(i)
    } else {
      console.log("Token detected - user")
      toggleCartItem(i);
    }
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Guest detected")
    }

    const total = calculateOrderTotal(cart);
    if (total === "0.00") {
      const checkoutBtn = document.getElementById("checkout")
      checkoutBtn.setAttribute("disabled", "disabled")
    } else {
      setShowOverlay(false);
      navigate("/checkout")
    }
    
  };

  useEffect(() => {
    showOverlay
      ? document.body.classList.add("stopScroll")
      : document.body.classList.remove("stopScroll");
  }, [showOverlay]);

  return (
    <div>
      <button className="button" onClick={popBag}>
        <div className={pop ? "pop" : ""}>
          <BagIcon />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </button>

      {showOverlay && (
        <>
          <div className="cart">
            <div className="cartOverlay">
              <div className="cartContainer">
                <button
                  className="close-btn"
                  onClick={() => setShowOverlay(false)}
                >
                  X
                </button>
                {cart.length > 0 ? (
                  cart.map((i) => (
                    <div key={i.id} className="cart-item">
                      <img src={i.image} alt={i.name} />
                      <p>{i.brand}</p>
                      <h4>{i.name}</h4>
                      <p>{i.price} lei</p>
                      <button
                        className="remove-from-cart-btn"
                        onClick={() => handleCart(i)}
                      >
                        REMOVE
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Empty Cart</p>
                )}
                <div className="cart-summary">
                  <div className="voucher-wrapper">
                    <input name="voucherCode" type="text" id="voucher-zone"/>
                    <button className="apply-code-btn">Apply Code</button>
                  </div>
                  <h3>Total: {calculateOrderTotal(cart)}</h3>
                  <button className="checkout-btn" id="checkout" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
