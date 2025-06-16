import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer" id="footerSection">
      <div className="footer-content">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="footer-logo" />
        </Link>

        <p>Made with 💗 by Shivam</p>
        <a href="mailto:shivamprakash444@gmail.com" className="footer-link">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
