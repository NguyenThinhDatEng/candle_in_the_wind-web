import React from 'react'
import Slider from "react-slick";

export default function Product() {
    var settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="container">
            <div className="section-item">
                <h2> Multiple items </h2>
                <Slider {...settings}>

                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>

                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                </Slider>
            </div>

            <div className="section-item">
                <h2> Multiple items </h2>
                <Slider {...settings}>

                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>

                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                </Slider>
            </div>

            <div className="section-item">
                <h2> Multiple items </h2>
                <Slider {...settings}>

                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>

                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="../assets/images/avatar.jpg" />
                        </div>
                        <div>
                            <p className="mt-3">Item name</p>
                            <p className="text-danger">000.000 VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                </Slider>
            </div>

        </div>



    )
}
