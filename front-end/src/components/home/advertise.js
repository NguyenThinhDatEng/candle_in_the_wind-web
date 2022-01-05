import React from 'react'
import Slider from "react-slick";

export default function Advertise() {
    var settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        speed: 2000,
    };
    return (
        <div className="container">
            <Slider {...settings}>
                <div className="image">
                    <img src="./assets/images/announcement.png" alt="" />
                </div>
                <div className="image">
                    <img src="./assets/images/announcement.png" alt="" />
                </div>
                <div className="image">
                    <img src="./assets/images/announcement.png" alt="" />
                </div>
            </Slider>
        </div>

    );
}
