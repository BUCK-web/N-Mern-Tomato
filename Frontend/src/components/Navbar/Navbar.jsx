import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/storeContex";

const Navbar = ({ setShowLogin }) => {
  const [Menu, setMenu] = useState("Home");
  const { CartTotal , settoken } = useContext(StoreContext);
  const [UserProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await fetch(
          "http://localhost:5000/api/user/profile",
          {
            credentials: "include",
          }
        );
        if (!profileResponse.ok) {
          throw new Error(`HTTP error! status: ${profileResponse.status}`);
        }
        const profileData = await profileResponse.json();
        setUserProfile(profileData.user);
        settoken(profileData.token)
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);
  const Logout = async ()=>{
    const logouts = await fetch("http://localhost:5000/api/user/logout" , {credentials: "include"})
    const profileData = await logouts.json();
    setUserProfile(null)
  }


  return (
    <nav>
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li
          className={Menu === "Home" ? "active" : ""}
          onClick={(e) => {
            setMenu(e.target.innerHTML);
          }}
        >
          Home
        </li>
        <li
          className={Menu === "Menu" ? "active" : ""}
          onClick={(e) => {
            setMenu(e.target.innerHTML);
          }}
        >
          Menu
        </li>
        <li
          className={Menu === "Mobile-app" ? "active" : ""}
          onClick={(e) => {
            setMenu(e.target.innerHTML);
          }}
        >
          Mobile-app
        </li>
        <li
          className={Menu === "Contact-Us" ? "active" : ""}
          onClick={(e) => {
            setMenu(e.target.innerHTML);
          }}
        >
          Contact-Us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          {CartTotal() > 0 ? <div className="dot"></div> : ""}
        </div>
        {UserProfile ? (
          <details>
            <summary><img src={assets.profile_icon} alt="" /></summary>
            <ul>
                <li>{UserProfile.email}</li>
                <Link to={'/myorders'}>My Orders</Link>
                <li onClick={()=>{Logout()}}>Logout</li>
            </ul>
          </details>
        ) : (
          <button className="sign" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
