import React, { useEffect } from "react";
import "../css/profile.css";

function Profile({ visible, onClose }) {
  useEffect(() => {
    if (visible) {
      document.body.classList.add("stopScroll");
    } else {
      document.body.classList.remove("stopScroll");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="overlayProfile" onClick={onClose}>
      <div className="profilePanel" onClick={(e) => e.stopPropagation()}>
        <h2>Account</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
        <button className="createAccount">Create Account</button>
      </div>
    </div>
  );
}

export default Profile;
