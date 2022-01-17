import React, { useState, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import Slider from "react-slick";
import Footer from "../footer/footer";
import Header from "../header/header";
import imgdemo from "./avatar.jpg";
import imgdemo1 from "./Balsam_and_Cedar_5ba57b31cc.png";
import { useAlert } from 'react-alert'
import "./item.css";
import axios from "axios";
import { CartContext } from "../../context/Context";
import ItemCard from "./itemCard";
require("dotenv").config();

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
		className={className}
		style={{ ...style, display: "block", background: "black" }}
		onClick={onClick}
	  />
	);
  }
  
  function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
		className={className}
		style={{ ...style, display: "block", background: "black" }}
		onClick={onClick}
	  />
	);
  }

const Item = (props) => {
  const {cart, addItemToCart, updateItemFromCart, data} = useContext(CartContext)

  const [toggle, setToggle] = useState(false);
  
  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  
  const [quantity, setQuantity] = useState(1);

  const [item, setItem] = useState([]);

  const [loading, setLoading] = useState(true)

  const alert = useAlert();

  // console.log(props.match.params.id)
  const [avt, setAvt] = useState('')
  useEffect(() => {
    (
    async () => {
      window.scrollTo(0, 0)
      setLoading(true)
      const result = await axios(
        process.env.REACT_APP_SERVER_URL + "/products/" +  props.match.params.id
      );
      setItem(result.data);
      setAvt(process.env.REACT_APP_SERVER_URL + result.data.avatar?.url)
      console.log(result.data.avatar?.url)
      setLoading(false)
    })()
  }, [props.match.params.id]);

  const settings = {
    infinite: true,
    rows: 1,
    dots: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div>
      <Header />
      {
        loading ?
        <>
          <div className="d-flex justify-content-center">
            <ReactLoading
              type="spinningBubbles"
              color="black"
              height={200}
              width={100}
            />
          </div>
        </> : 
        <>
          <div className="itemscreen">
            <div className="itemscreen__left">
              <div className="left__image">
                <img
                  src= {avt}
                  alt="product name"
                />
              </div>
            </div>
            <div className="itemscreen__right">
              <div className="right__info">
                <p className="right__info__name">{item?.name}</p>
                {
                  item?.discount === 0 ? (
                    
                    <div className="right__info__price">
                      <span className="right__info__new__price" style={{marginLeft:'0px'}}>
                        ${Number(item?.price) }
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="right__info__price">
                        <span className="right__info__new__price" style={{marginLeft:'0px'}}>
                        ${Number(item?.price) * (100 - Number(item?.discount)) / 100 }
                        </span>
                        <span className="right__info__actual__price" style={{color:'black'}}>
                          ${Number(item?.price) }
                        </span>
                      </div>
                    </>
                  )
                }

                <div className="right__info__qty">
                  Quantity
                  {item.quantityStock ? (

                  (<div className="qtydiv">
                    <div className="qtybox">
                      <span
                        className="btnqty qtyminus icon icon-minus"
                        onClick={() =>
                          setQuantity((pre) => (pre === 1 ? 1 : pre - 1))
                        }
                      >
                        -
                      </span>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        min="1"
                        max={item.quantityStock}
                        className="quantity-selector quantity-input"
                        onChange={(e) =>{
                          setQuantity(Number(e.target.value));
                        }}
                      />
                      <span
                        className="btnqty qtyplus icon icon-plus"
                        onClick={() => setQuantity((pre) => pre + 1)}
                      >
                        +
                      </span>
                    </div>
                  </div>)
                  ) : (
                    <p style={{color: 'red'}}>Out of stock</p>
                  )}
                </div>
                {item.quantityStock ? (
                  <p>
                    <button 
                    className="cart-btn" 
                    type="button" 
                    onClick={()=>{
                      if(localStorage.getItem("user-info")){
                        if (cart.find((product) => product?.product === item?._id)){
                          updateItemFromCart(item, quantity)
                          // console.log("Update")
                        }
                        else {
                          addItemToCart({data: item, quantity: quantity})
                          // console.log("Add")
                        }
                      } else {
                        alert.show("Please sign in")
                      }
                      
                    }} 
                    >
                      Add to cart
                    </button>
                  </p>

                ) : (
                  null
                )}
                {/* <div className="rightscreen__productinfo">
                  <span className="product__info" onClick={toggler}>
                    <i
                      style={{ fontSize: "24px" }}
                      className={toggle ? "fa check" : "fa"}
                    >
                      &#xf0da;
                    </i>{" "}
                    Product Infomation
                  </span>

                  <div className="list">
                    {toggle ? (
                      <>
                        <li>abc</li>
                        <li>abc</li>
                        <li>abc</li>
                      </>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className = 'smallImg'>
            <img
                  src={process.env.REACT_APP_SERVER_URL + item?.avatar?.url}
                  alt="product name"
                  onClick={() => setAvt(process.env.REACT_APP_SERVER_URL + item?.avatar?.url)}
              />
          {
            item?.related_images?.length > 0 ?(
              item?.related_images?.map((rImg)=>(
                <img
                  src={process.env.REACT_APP_SERVER_URL + rImg?.url}
                  alt="product name"
                  onClick={() => setAvt(process.env.REACT_APP_SERVER_URL + rImg?.url)}
                  key={rImg._id}
                />
                
                )
                )
                ):(
                  <span></span>
                  )
                }
                </div>
          <div className="description__screen">
            <h2 className="heading">Description</h2>
            <p className="des" style={{
              'white-space': 'pre-wrap'
              }}>{item?.description}</p>
          </div>
          <div className="related__screen">
            <h2 style={{marginBottom: '5rem'}}>Related Products</h2>
            
            <Slider {...settings}>
              {data.filter(
                (val) => {
                  if(val._id !== item._id) {return val}
                }
              ).map((value) => {
                if (value?.catalog?.name === item?.catalog?.name){
                  return (
                    <ItemCard value={value} key={value._id} />
                    
                  )
                }
              })}
            </Slider>
            
          </div>
        
        </>
      }
      <Footer />
    </div>
  );
};

export default Item;
