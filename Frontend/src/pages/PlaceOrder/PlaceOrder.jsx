import React, { useContext, useState } from "react";
import "./placeOrder.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContex";
import axios from "axios";
const PlaceOrder = () => {
  const { CartTotal, token, food_list, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [Data, setData] = useState({});
  let orderList = [];
  food_list.map((item) => {
    if (cartItems[item._id] > 0) {
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderList.push(itemInfo);
    }
  });

  const handleInputChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmits = async (e) => {
    e.preventDefault();

    let orderData = {
      address: Data,
      items: orderList,
      amount: CartTotal() + 12,
    };

    let response = await axios.post(
      `http://localhost:5000/api/payment/place`,
      orderData,
      { headers: { token } }
    );
    if (response.data.success) {
      const { session_URL } = response.data;
      window.location.replace(session_URL);
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <form
        action=""
        className="Place-order"
        onSubmit={(e) => {
          handleSubmits(e);
        }}
      >
        <div className="place-order-left">
          <p className="title">Delevery Inforamtion</p>
          <div className="multi-filds">
            <input
              type="text"
              placeholder="First Name "
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="First Name"
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="Last Name"
            />
          </div>
          <input
            type="email"
            placeholder="Email-Address"
            onChange={(e) => {
              handleInputChange(e);
            }}
            name="Email-Address"
          />
          <input
            type="text"
            placeholder="Street"
            onChange={(e) => {
              handleInputChange(e);
            }}
            name="Street"
          />
          <div className="multi-filds">
            <input
              type="text"
              placeholder="city "
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="city"
            />
            <input
              type="text"
              placeholder="State"
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="State"
            />
          </div>
          <div className="multi-filds">
            <input
              type="text"
              placeholder="ZipCode"
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="ZipCode"
            />
            <input
              type="text"
              placeholder="Country"
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="Country"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            onChange={(e) => {
              handleInputChange(e);
            }}
            name="Phone"
          />
        </div>
        <div className="place-order-right">
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
            <button>Proceed To Payment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
