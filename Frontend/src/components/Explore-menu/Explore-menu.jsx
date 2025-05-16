import React from 'react'
import "./Explore.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({Catagores,setCatagores}) => {
    // console.log(Catagores);
  return (
    <>
        <div className="explore" id='explore'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring an array of dishes with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
            <div className="explore-menu-list">
                {menu_list.map((items,index)=>{
                    return(
                        <div onClick={()=>{setCatagores(prev=>prev === items.menu_name ? "All" :items.menu_name )}} key={index} className='explore-menu-list-item'>
                            <img className={Catagores === items.menu_name ? "active" : ""} src={items.menu_image} alt="" />
                            <p>{items.menu_name}</p>
                        </div>
                    )
                })
                }
            </div>
            <hr />
        </div>
    </>
  )
}

export default ExploreMenu