import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/storeContex";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cartItems, food_list, removeFromCart,CartTotal } = useContext(StoreContext);
  const navigate = useNavigate()
  const handleRemoveItemClick = (itemId) => {
    removeFromCart(itemId);
  };
  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div
                  className="cart-items-title cart-items-item"
                  key={item._id}
                >
                  <img src={`${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p>
                    <img
                      onClick={() => handleRemoveItemClick(item._id)}
                      src={assets.cross_icon}
                      alt=""
                      className="cross"
                    />
                  </p>
                </div>
              );
            }
            return null; // Added to satisfy React's requirement of returning a single element or null from map function
          })}
          <hr />
        </div>
        <div className="cart-bottom">
          <div className="cart-Total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-detalis">
                <p>SubTotal</p>
                <p>${CartTotal()}</p>
              </div>
              <hr className="hrtag" />
              <div className="cart-total-detalis">
                <p>Delevery Fee</p>
                <p>${12}</p>
              </div>
              <hr className="hrtag" />
              <div className="cart-total-detalis">
                <b>Total</b>
                <b>${CartTotal() + 12}</b>
              </div>
            </div>
            <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
          </div>
          <div className="cart-promoCode">
            <div>
              <p>If you Have a Promocode Enter Here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo Code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
