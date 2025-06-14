import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <footer className="footer" id="footerSection">
      <div className="footer-content">
        <img src={assets.logo} alt="Logo" className="footer-logo" />
        <p>Made with 💗 by Shivam</p>
        <a href="mailto:shivamprakash444@gmail.com" className="footer-link">
          Mail
        </a>
      </div>
    </footer>
  );
};

export default Footer;
