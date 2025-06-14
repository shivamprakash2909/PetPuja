import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="exploreMenuSection">
      <h1>Explore Our menu</h1>
      <p className="explore-menu-text">
        choose from a diverse menu featuring a delectable array of dishes. Our mision is to satisfy your cravings and
        elevateyour dining experience, and delicious meals at a time.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => {
                setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name));
              }}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active-menu-item" : ""}
                src={item.menu_image}
                alt="menu item"
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
