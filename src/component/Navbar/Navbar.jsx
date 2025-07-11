import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin, setShowSignup }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, totalCartValue } = useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="logo" />
      </Link>
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
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {totalCartValue() === 0 ? <></> : <div className="dot"></div>}
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
