import React from "react";
import "./Cart.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { food_list, cartItems, removeFromCart, addToCart, totalCartValue, deliveryFees } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="art-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Manage</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹ {item.price * cartItems[item._id]}</p>
                  <div className="manage-item-cart">
                    <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="add-icon-green" />
                    <img
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_purple}
                      alt="removeicon-purple"
                    />
                  </div>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{totalCartValue()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFees()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{totalCartValue() + deliveryFees()}</p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
