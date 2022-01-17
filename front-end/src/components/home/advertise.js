import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";
import "./product.css";

export default function Advertise() {
  const [data, setData] = useState([]);
  var settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    speed: 2000,
  };
  useEffect(async () => {
    const banners = await axios(process.env.REACT_APP_SERVER_URL + "/global/");
    // console.info(banners);
    setData(banners.data.Slider);
  }, []);
  return (
    <div className="container">
      <Slider {...settings}>
        {data &&
          data.map((value) => {
            console.info(value);
            return (
              <div className="image">
                <img
                  style={{ objectFit: "contain" }}
                  src={process.env.REACT_APP_SERVER_URL + value?.image?.url}
                  alt=""
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
