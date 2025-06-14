import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src="/header_img.jpg" alt="Banner image" className="header-image" />
      <div className="header-contents">
        <h1>Your favourite food is just a click away!</h1>
        <p>
          Indulge in a curated selection of gourmet dishes, prepared with premium ingredients and exceptional culinary
          skills.Our mission is tio satisfy your cravings with a delightful array of flavors.
        </p>
        <button>view menu</button>
      </div>
    </div>
  );
};

export default Header;
