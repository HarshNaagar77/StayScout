import React from "react";
import "../Css/Homepage2.css";
import "../Css/Home_mobile.css";
import houseimg2 from "../assets/houseimg2.png";
import { Link } from "react-router-dom";


export default function Homepage2() {
  return (
    <div className="homepage2" id="homepage2">
      <div className="mainhome2">
        <img src={houseimg2} alt="" className="houseimg2" />
        <img src={houseimg2} alt="" className="houseimg2mob" />
        <div className="home2text">
          <p className="first">Explore</p> 
          <p className="second">More Places</p>
          <p className="third">Worry Less Today.</p>
          <div className="btns">
          <button className="home2btn">
            <Link to='/start' className='registerlink2'>Get Started</Link>
            </button>
          <button className="home2arrow"><i class="bi bi-arrow-right"></i></button>
          </div>

        </div>
      </div>
    </div>
  );
}
