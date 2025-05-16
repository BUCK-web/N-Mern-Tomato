import React, { useState } from 'react';
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPop = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "login") {
        const response = await fetch("http://localhost:5000/api/user/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password
          })
        });
        const data = await response.json();
        console.log(data);
      } else if (currentState === "signup") {
        const response = await fetch("http://localhost:5000/api/user/signup", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            name
          })
        });
        const data = await response.json();
        console.log(data); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="loginPop">
      <form className="Login-popUp-ctn" onSubmit={handleSubmit}>
        <div className="login-popUp-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-poup-inputs">
          {currentState === "login" ? null : <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} required />}
          <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder='Your Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{currentState === "signup" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing Terms</p>
        </div>
        {
          currentState === "signup" ?
            <p className="login-popup-switch">Already have an account? <span onClick={() => setCurrentState("login")}>Login</span></p>
            :
            <p className="login-popup-switch">Don't have an account? <span onClick={() => setCurrentState("signup")}>Sign Up</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPop;
