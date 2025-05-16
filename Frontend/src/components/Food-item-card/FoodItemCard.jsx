import React, { useContext, useState } from "react";
import "./FoodItemCard.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContex";
const FoodItemCard = ({ id, name, price, description, img  }) => {
  const { cartItems, setCartItems, addToCart, removeFromCart,CheckChatagoery } = useContext(StoreContext);
  return (
    <div>
      <div className="Fooditem">
        <div className="food-item-img-ctn">
          <img src={img} alt="" className="food-item-img" />
          {!cartItems[id] ? (
            <img
              src={assets.add_icon_white}
              alt=""
              className="add"
              onClick={() => {
                addToCart(id);
              }}
            />
          ) : (
            <div className="food-item-counter">
              <img
                src={assets.remove_icon_red}
                alt=""
                onClick={() => {
                  removeFromCart(id);
                }}
              />
              <p>{cartItems[id]}</p>
              <img
                src={assets.add_icon_green}
                alt=""
                onClick={() => {
                  addToCart(id);
                }}
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
