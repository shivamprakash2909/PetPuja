import React, { useContext } from "react";
import "./DisplayFood.css";
import { StoreContext } from "../../context/StoreContext";
import FoodCard from "../FoodCard/FoodCard";
const DisplayFood = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display">
      <h2>Top food dishes</h2>
      <div className="food-item-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodCard
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default DisplayFood;
