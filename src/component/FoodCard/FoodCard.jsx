import React, { useContext, useState } from "react";
import "./FoodCard.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodCard = ({ id, name, image, price, description }) => {
  // const [itemCount, setItemCount] = useState(0);

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-card">
      <div className="food-card-img-item">
        <img src={image} alt="food-image" />

        {!cartItems[id] ? (
          <img
            onClick={() => {
              addToCart(id);
            }}
            className="add-button"
            src={assets.add_icon_white}
            alt="add-icon-white"
          />
        ) : (
          <div className="food-count">
            <img
              className="remove-item"
              onClick={() => {
                removeFromCart(id);
              }}
              src={assets.remove_icon_purple}
              alt="remove-icon-purple"
            />
            <p className="item-count">{cartItems[id]}</p>
            <img
              className="add-item"
              onClick={() => {
                addToCart(id);
              }}
              src={assets.add_icon_green}
              alt="add-icon-green"
            />
          </div>
        )}
      </div>
      <div className="food-card-info">
        <div className="fod-card-name-rating">
          <p>{name}</p>
          <img className="rating-image" src={assets.rating_stars} alt="rating-img" />
        </div>
        <p className="food-card-description">{description}</p>
        <p className="food-card-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodCard;
