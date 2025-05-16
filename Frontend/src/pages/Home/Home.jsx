import React,{useState} from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/Explore-menu/Explore-menu";
import FoodDisplay from "../../components/Food-Display/FoodDisplay";
import AppDownloads from "../../components/AppDownloads/AppDownloads";
const Home = () => {
    const [Catagores , setCatagores ] = useState("All")
    return (
    <header>
      <Header />
      <ExploreMenu Catagores={Catagores} setCatagores={setCatagores}/>
      <FoodDisplay Catagores={Catagores}/>
      <AppDownloads/>
    </header>
  );
};

export default Home;
