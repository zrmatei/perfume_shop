import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import judeteOrase from "../data/ro.json";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext.js";
import { useCart } from "./auth/CartContext.js";
import "../css/profile.css";
import { useWishlist } from "./auth/WishlistContext.js";

function Profile({ visible, onClose }) {
  const [pressedCreateAcc, setPressedCreateAcc] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [stradaNr, setStradaNr] = useState("");
  const [codPostal, setCodPostal] = useState("");
  const [oras, setOras] = useState("");
  const [judet, setJudet] = useState("");
  const [oraseDisponibile, setOraseDisponibile] = useState([]);
  const [nrTel, setNrTel] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { isLogged, user, login, logout } = useContext(AuthContext);
  const { clearCart } = useCart();
  const {clearWishlist} = useWishlist();
  

  useEffect(() => {
    visible
      ? document.body.classList.add("stopScroll")
      : document.body.classList.remove("stopScroll");
  }, [visible]);

  useEffect(() => {
    if (judet) {
      const judetGasit = judeteOrase.find((j) => j.judet === judet);
      setOraseDisponibile(judetGasit ? judetGasit.orase : []);
    } else {
      setOraseDisponibile([]);
    }
  }, [judet]);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8081/login", {email,pass});
      login(res.data.token);
      navigate("/");
      clearCart()
      clearWishlist()
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  const handleRegister = async () => {
    if (pass !== confirmPass) {
      alert("Passwords don't match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8081/register", {email,pass,stradaNr,codPostal,oras,judet,nrTel,nume,prenume});
    } catch (err) {
      console.log(err);
    }
  };

  if (!visible) return null;

  return (
    <div className="overlayProfile" onClick={onClose}>
      <div className="profilePanel" onClick={(e) => e.stopPropagation()}>
        {isLogged ? (
          <>
            <h1>HELLO {user.nume} {user.prenume}</h1>
            {/* TODO: ADAUGAT LUCRURI IN COS + WISHLIST + FINALIZARE COMANDA */}
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <h2>Account</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              id="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {pressedCreateAcc ? (
              <>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPass"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="First Name"
                  value={nume}
                  onChange={(e) => setNume(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={prenume}
                  onChange={(e) => setPrenume(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Strada & nr"
                  value={stradaNr}
                  onChange={(e) => setStradaNr(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cod Postal"
                  value={codPostal}
                  onChange={(e) => setCodPostal(e.target.value)}
                />
                <select
                  value={judet}
                  onChange={(e) => setJudet(e.target.value)}
                >
                  <option value="">Alege judetul</option>
                  {judeteOrase.map((j, id) => (
                    <option key={id} value={j.judet}>
                      {j.judet}
                    </option>
                  ))}
                </select>
                <select value={oras} onChange={(e) => setOras(e.target.value)}>
                  <option value="">Alege oras</option>
                  {oraseDisponibile.map((o, id) => (
                    <option key={id} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Nr Telefon"
                  value={nrTel}
                  onChange={(e) => setNrTel(e.target.value)}
                />
                <button className="createAccount" onClick={handleRegister}>
                  Create Account
                </button>
                <p>
                  Already have an account?{" "}
                  <span
                    className="link"
                    onClick={() => setPressedCreateAcc(!pressedCreateAcc)}
                  >
                    Log in
                  </span>
                </p>
              </>
            ) : (
              <>
                <button onClick={handleLogin}>Log In</button>

                <p>
                  Don't have an account?{" "}
                  <span
                    className="link"
                    onClick={() => setPressedCreateAcc(!pressedCreateAcc)}
                  >
                    Create one
                  </span>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
