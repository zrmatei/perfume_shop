import React, { useEffect, useState } from "react";
import axios from "axios"
import judeteOrase from "../data/ro.json"
import "../css/profile.css";

function Profile({ visible, onClose }) {
  const [pressedCreateAcc, setPressedCreateAcc] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [stradaNr, setStradaNr] = useState("");
  const [codPostal, setCodPostal] = useState("")
  const [oras, setOras] = useState("")
  const [judet, setJudet] = useState("");
  const [oraseDisponibile, setOraseDisponibile] = useState([]);
  const [nrTel, setNrTel] = useState("")
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    visible
      ? document.body.classList.add("stopScroll")
      : document.body.classList.remove("stopScroll");
  }, [visible]);

  useEffect(() => {
    if(judet){
      const judetGasit = judeteOrase.find(j => j.judet === judet)
      setOraseDisponibile(judetGasit ? judetGasit.orase : [])
    }else{
      setOraseDisponibile([])
    }
  }, [judet])

  if (!visible)
     return null;

  const handleLogin = async () => {
    try{
      const res = await axios.post("http://localhost:8081/login", {
        email,
        pass,
      });
      localStorage.setItem("token", res.data.token);
    }catch(err){
      console.log(err)
    }
  }

  const handleRegister = async () => {
    if(pass !== confirmPass){
      alert("Passwords don't match");
      return;
    }
    try{
      const res = await axios.post("http://localhost:8081/register", {
        email,
        pass,
        stradaNr,
        codPostal,
        oras,
        judet,
        nrTel,
      })
    }catch(err){
      console.log(err)
    }
  }



  return (
    <div className="overlayProfile" onClick={onClose}>
      <div className="profilePanel" onClick={(e) => e.stopPropagation()}>
        <h2>Account</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" id="pass" value={pass} onChange={(e) => setPass(e.target.value)}/>
        {pressedCreateAcc ? (
          <>
            <input type="password" placeholder="Confirm Password" id="confirmPass" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
            <input type="text" placeholder="Strada & nr"  value={stradaNr} onChange={(e) => setStradaNr(e.target.value)}/>
            <input type="text" placeholder="Cod Postal"  value={codPostal} onChange={(e) => setCodPostal(e.target.value)}/>
            <select value={judet} onChange={(e) => setJudet(e.target.value)}>
              <option value="">Alege judetul</option>
              {judeteOrase.map((j, id) => (
                <option key={id} value={j.judet}>{j.judet}</option>
              ))}
            </select>
            <select value={oras} onChange={(e) => setOras(e.target.value)}>
              <option value="">Alege oras</option>
              {oraseDisponibile.map((o, id) => (
                <option key={id} value={o}>{o}</option>
              ))}
            </select>
            <input type="text" placeholder="Nr Telefon"  value={nrTel} onChange={(e) => setNrTel(e.target.value)}/>
            <button className="createAccount" onClick={handleRegister}>Create Account</button>
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
      </div>
    </div>
  );
}

export default Profile;
