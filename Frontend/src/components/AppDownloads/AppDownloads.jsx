import React from 'react'
import "./AppDownloads.css"
import {assets} from "../../assets/assets"
const AppDownloads = () => {
  return (
    <>
      <div className="app-downloads" id="app-downloads">
        <p>For Better Exprence Download <br /> TomaTo App</p>
        <div className="app-downloads-platfoems">
          <img src={assets.play_store} alt="" />
          <img src={assets.app_store} alt="" />
        </div>
      </div>
    </>
  )
}

export default AppDownloads