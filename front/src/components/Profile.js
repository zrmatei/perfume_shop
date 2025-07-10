import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import judeteOrase from "../data/ro.json";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext.js";
import { useCart } from "./auth/CartContext.js";
import "../css/profile.css";
import { useWishlist } from "./auth/WishlistContext.js";
import validator from "validator";

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
  const [errors, setErrors] = useState({});
  const { isLogged, user, login, logout } = useContext(AuthContext);
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();

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
    let valid = true;
    const newErrors = {};
    if (!validator.isEmail(email)) {
      newErrors.email = "Enter email";
      valid = false;
    }
    if (pass.length <= 0) {
      newErrors.pass = "Enter pass";
      valid = false;
    }

    setErrors(newErrors);
    setTimeout(() => setErrors({}), 2000);
    if (!valid) return;

    try {
      const res = await axios.post("http://localhost:8081/login", {
        email,
        pass,
      });
      await login(res.data.token);
      navigate("/");
      clearCart();
      clearWishlist();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email required";
    else if (!validator.isEmail(email)) newErrors.email = "Email not valid";

    if (!pass) newErrors.pass = "Pass required";
    else if (
      !validator.isStrongPassword(pass, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    )
      newErrors.pass = "Pass needs to have at least 6 chars and 1 number";

    if (!confirmPass) newErrors.confirmPass = "Confirm required";
    else if (pass !== confirmPass)
      newErrors.confirmPass = "Passwords don't match";

    if (!nrTel) newErrors.nrTel = "Telephone No required";
    else if (!validator.isMobilePhone(nrTel, "ro-RO"))
      newErrors.nrTel = "Number not valid";

    if (!codPostal) newErrors.codPostal = "Postal code required";
    else if (!validator.isPostalCode(codPostal, "RO"))
      newErrors.codPostal = "Postal code not valid";

    if (!nume) newErrors.nume = "First name required";
    if (!prenume) newErrors.prenume = "Last name required";
    if (!judet) newErrors.judet = "Pick a county";
    if (!oras) newErrors.oras = "Pick a city";

    setErrors(newErrors);
    setTimeout(() => setErrors({}), 2000);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateRegisterForm()) {
      return;
    }
    try {
      const res = await axios.post("http://localhost:8081/register", {
        email,
        pass,
        stradaNr,
        codPostal,
        oras,
        judet,
        nrTel,
        nume,
        prenume,
      });
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
            <h1 id="user-profile">
              HELLO, {user.nume} {user.prenume} 👋
            </h1>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <h2>Account</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="pass-err-text">{errors.email}</p>}
            <input
              type="password"
              placeholder="Password"
              id="pass"
              value={pass}
              required
              onChange={(e) => setPass(e.target.value)}
            />
            {errors.pass && <p className="pass-err-text">{errors.pass}</p>}
            {pressedCreateAcc ? (
              <>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPass"
                  value={confirmPass}
                  required
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                {errors.confirmPass && (
                  <p className="pass-err-text">{errors.confirmPass}</p>
                )}
                <input
                  type="text"
                  placeholder="First Name"
                  value={nume}
                  required
                  onChange={(e) => setNume(e.target.value)}
                />
                {errors.nume && <p className="pass-err-text">{errors.nume}</p>}

                <input
                  type="text"
                  placeholder="Last Name"
                  value={prenume}
                  required
                  onChange={(e) => setPrenume(e.target.value)}
                />
                {errors.prenume && (
                  <p className="pass-err-text">{errors.prenume}</p>
                )}

                <input
                  type="text"
                  placeholder="Street & No"
                  value={stradaNr}
                  onChange={(e) => setStradaNr(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={codPostal}
                  required
                  onChange={(e) => setCodPostal(e.target.value)}
                />
                {errors.codPostal && (
                  <p className="pass-err-text">{errors.codPostal}</p>
                )}

                <select
                  value={judet}
                  onChange={(e) => setJudet(e.target.value)}
                >
                  <option value="">Pick a county</option>
                  {judeteOrase.map((j, id) => (
                    <option key={id} value={j.judet}>
                      {j.judet}
                    </option>
                  ))}
                </select>
                {errors.judet && (
                  <p className="pass-err-text">{errors.judet}</p>
                )}
                <select value={oras} onChange={(e) => setOras(e.target.value)}>
                  <option value="">Pick a city</option>
                  {oraseDisponibile.map((o, id) => (
                    <option key={id} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.oras && <p className="pass-err-text">{errors.oras}</p>}
                <input
                  type="text"
                  placeholder="Telephone No"
                  value={nrTel}
                  required
                  onChange={(e) => setNrTel(e.target.value)}
                />
                {errors.nrTel && (
                  <p className="pass-err-text">{errors.nrTel}</p>
                )}

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
