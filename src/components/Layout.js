import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <div className="homeBar">
        <h1 id="brand_name">VOID</h1>
        <h3 className="barDetails">Search</h3>
        <h3 className="barDetails">Wishlist</h3>
        <h3 className="barDetails">My account</h3>
      </div>
      <Outlet/>
    </div>
  );
}

export default Layout;
