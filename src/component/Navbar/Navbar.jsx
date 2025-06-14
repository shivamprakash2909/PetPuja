import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = ({ setShowLogin, setShowSignup }) => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a href="#exploreMenuSection" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
          Menu
        </a>
        <a href="#footerSection" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button
          onClick={() => {
            setShowLogin(true);
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
