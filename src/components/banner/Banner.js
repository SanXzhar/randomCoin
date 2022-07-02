import React from "react";
import Carousel from "./Carousel";
import './style.css'


const Banner = () => {

    return(
        <div>
              <div className="maintitle">Crypto Rush</div>
              <div className="subtitle">Get All The Info Regarding Your Favorite Crypto Currency</div>
              <Carousel></Carousel>
        </div>
    )
};

export default Banner;