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
  const [voucher, setVoucher] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [voucherErr, setVoucherErr] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const popBag = () => {
    setPop(true);
    setShowOverlay(true);
    setTimeout(() => setPop(false), 500);
  };

  const handleCart = (i) => {
    const token = localStorage.getItem("token");
    toggleCartItem(i);
    console.log(token ? "Token detec - user" : "Token null - guest");
  };

  const calculateOrderTotal = (items) => {
    const total = items.reduce((total, item) => total + item.price, 0);
    const discount = total * (discountPercent / 100);
    const finalDiscount = total - discount;
    return {
      total: total.toFixed(2),
      finalDiscount: finalDiscount.toFixed(2),
      discount: discount.toFixed(2),
    };
  };


  const applyCode = async () => {
    try {
      const res = await fetch("http://localhost:8081/check-voucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discountCode: voucher }),
      });
      if (!res.ok) {
        setVoucherErr("Can't update cart total");
        setDiscountPercent(0);
        localStorage.removeItem("discountPercent")
        localStorage.removeItem("voucherCode")
        return;
      }
      const { percent } = await res.json();
      setDiscountPercent(percent);
      localStorage.setItem("discountPercent", percent)
      localStorage.setItem("voucherCode", voucher)
      setVoucherErr("");
    } catch (err) {
      console.error(err);
    }
  };

  const goToCheckout = () => {
    setShowOverlay(false)
    navigate("/checkout")
  }

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
                    <input
                      name="voucherCode"
                      type="text"
                      id="voucher-zone"
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                    <button className="apply-code-btn" onClick={applyCode}>
                      Apply Code
                    </button>
                  </div>
                  <h3>Total: {calculateOrderTotal(cart).finalDiscount}</h3>
                  <button
                    className="checkout-btn"
                    id="checkout"
                    onClick={goToCheckout}
                    disabled={cart.length === 0}
                  >
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
