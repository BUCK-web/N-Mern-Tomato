import React from "react";
import "./OrderCards.css";
import { assets } from "../../assets/assets";

const OrderCards = ({ items, amount, status }) => {
  console.log(items, amount, status);

  return (
    <>
      <div className="card">
        <img src={assets.parcel_icon} alt="" className="imgs" />
        {/* Render items */}
        <div  className="item">
          {items.map((item, index) => {
            return (
              <div key={index} >
                <p>{item.name} x {item.quantity}</p>
              </div>
            );
          })}
        </div>
        <p> ${amount}</p>
        <p>Items: {items.length}</p>
        <p className="process">
          <div className="dot"></div>{status}
        </p>
        <button className="track">Track Order</button>
      </div>
    </>
  );
};

export default OrderCards;
