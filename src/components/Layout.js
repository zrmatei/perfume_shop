import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profile from '../assets/profile.svg';
import search from '../assets/search.svg';
import heart from '../assets/heart.svg';
import bag from '../assets/shopping-bag.svg'
import fidelity from '../assets/card-clubs.svg'

function Layout() {
  return (
    <div>
      <div className="header">
        {/*TODO*/}
        <div id='barLeft' className='fidelityContainer'>
          <img src={fidelity} alt='fidelity card' id='fidelity'/>
          <span className='fidelityText'>LOYALTY PROGRAME</span>
        </div>
        <div id='barCenter'>
          <img src={logo} alt='text logo'></img>
        </div>
        <div id='barRight'>
          <img src={search} alt='search product logo'/>
          <img src={profile} alt='profile logo'/>
          <img src={heart} alt='add to wishlist logo'/>
          <img src={bag} alt='add to cart logo'/>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default Layout;
