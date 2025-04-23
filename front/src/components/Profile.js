import React, { useEffect, useState } from "react";
import "../css/profile.css";

function Profile({ visible, onClose }) {
  const [pressedCreateAcc, setPressedCreateAcc] = useState(false);
  
  useEffect(() => {
    visible
      ? document.body.classList.add("stopScroll")
      : document.body.classList.remove("stopScroll");
  }, [visible]);
  if (!visible) return null;

  return (
    <div className="overlayProfile" onClick={onClose}>
      <div className="profilePanel" onClick={(e) => e.stopPropagation()}>
        <h2>Account</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" id="pass"/>
        {pressedCreateAcc ? (
          <>
            <input type="password" placeholder="Confirm Password" id="confirmPass"/>
            <button className="createAccount" >Create Account</button>
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
            <button >Log In</button>
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
