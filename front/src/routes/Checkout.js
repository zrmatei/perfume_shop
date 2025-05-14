import { useState } from "react";
import "../css/checkout.css"
import { useCart } from "../components/auth/CartContext";
import { useNavigate } from "react-router";

function Checkout() {
  const {cart, clearCart} = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNo: "",
    apt: "",
    county: "",
    city: "",
    postalCode: ""
  })
  const discountPercent = parseFloat(localStorage.getItem("discountPercent" || 0))
  const voucher = localStorage.getItem("voucherCode" || null)
  
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price, 0)
    const discount = subtotal * (discountPercent / 100)
    const shipping = 15
    const total = subtotal -  discount + shipping
    return {subtotal, discount, shipping, total}
  }
  const {subtotal, shipping, total} = calculateTotal()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    
    try {
        const res = await fetch("http://localhost:8081/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            produse: cart.map((p) => ({
              id: p.id,
              name: p.name,
              brand: p.brand,
              price: p.price,
              quantity: p.quantity || 1,
            })),
            total: parseFloat(total),
            discountCode: voucher,
            livrare: form
          }),
        });
        if (res.ok) {
          console.log("Order placed");
          clearCart();
          localStorage.removeItem("discountPercent")
          localStorage.removeItem("voucherCode")
          navigate("/");
        } else {
          console.log("Order error!!");
        }
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <div className="checkout-wrapper">

      <form className="checkout-container" onSubmit={handleSubmit}>
        <div className="checkout-shipping-info">
          <h2>CHECKOUT</h2>

          <label>
            First Name
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name
            <input
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Street Address
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone No.
            <input
              name="phoneNo"
              type="text"
              value={form.phoneNo}
              onChange={handleChange}
            />
          </label>

          <label>
            Apt/Suite/Unit (Optional)
            <input
              name="apt"
              type="text"
              value={form.apt}
              onChange={handleChange}
            />
          </label>

          <label>
            County
            <input
              name="county"
              type="text"
              value={form.county}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            City
            <input
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Postal Code
            <input
              name="postalCode"
              type="text"
              value={form.postalCode}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="checkout-order-summary">
          <h3>SUMMARY</h3>
          <p>Subtotal: {subtotal} lei</p>
          <p>Shipping: {shipping} lei</p>
          <p><strong>Total: {total} lei</strong></p>
          <button type="submit" className="checkout-btn">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
