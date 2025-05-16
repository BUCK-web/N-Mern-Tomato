import React from 'react'
import "./NavAdmin.css"
import {assets} from "../../assets/assets"
const NavAdmin = () => {
  return (
    <div>
        <div className="logo"></div>
        <div className="profile-img">
            <img src={assets.profile_icon} alt="" />
        </div>
    </div>
  )
}

export default NavAdmin