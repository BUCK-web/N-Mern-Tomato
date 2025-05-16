import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/storeContex";
import FoodItemCard from "../Food-item-card/FoodItemCard";

const FoodDisplay = ({ Catagores }) => {
  const { food_list, CheckChatagoery } = useContext(StoreContext);
  const filteredData = CheckChatagoery(Catagores);
  const foodItems = Catagores === "All" ? food_list : filteredData;

  
  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top Dishes Near You</h2>

        <div className="food-Display-list">
          {foodItems.map((item, index) => {
            return <FoodItemCard
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              img={item.image}
              Catagores={item.Catagores}
            />;
          })}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;
