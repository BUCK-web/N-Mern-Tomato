import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <>
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src={assets.logo} alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              beatae exercitationem ullam vero? Blanditiis aliquam officiis quas
              sunt unde quis odit expedita, asperiores id numquam.
            </p>
            <div className="social-media">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
          </div>
          <div className="footer-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home </li>
                <li>About-us </li>
                <li>Delevery </li>
                <li>Privacy Ploicy</li>
            </ul>
          </div>
          <div className="footer-right">
            <h2>Get in Touch</h2>
            <ul>
                <li>+968 696969696</li>
                <li>Contact@Tomata.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
            &copy; 2021 Tomato. All rights reserved. Designed by{" "}
        </p>
      </div>
    </>
  );
};

export default Footer;
