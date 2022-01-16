import React, { useState, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import Footer from "../footer/footer";
import Header from "../header/header";
import imgdemo from "./avatar.jpg";
import imgdemo1 from "./Balsam_and_Cedar_5ba57b31cc.png";
import { useAlert } from 'react-alert'
import "./item.css";
import axios from "axios";
import { CartContext } from "../../context/Context";
require("dotenv").config();

const Item = (props) => {
  const {cart, addItemToCart, updateItemFromCart} = useContext(CartContext)

  const [toggle, setToggle] = useState(false);
  
  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  
  const [quantity, setQuantity] = useState(1);

  const [item, setItem] = useState([]);

  const [loading, setLoading] = useState(true)

  const alert = useAlert();
  console.log(cart)
  const [avt, setAvt] = useState('')
  
  useEffect(async () => {
    const result = await axios(
      process.env.REACT_APP_SERVER_URL + "/products/" +  props.match.params.id
      );
      setItem(result.data);
      setAvt(process.env.REACT_APP_SERVER_URL + result.data.avatar?.url)
      console.log(result.data.avatar?.url)
      setLoading(false)
    }, []);
    
    

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
                  <div className="qtydiv">
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
                  </div>
                </div>
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
                        addItemToCart({item, quantity})
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
                <div className="rightscreen__productinfo">
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
                </div>
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
                />
                
                )
                )
                ):(
                  <span></span>
                  )
                }
                </div>
          <div className="description__screen">
            <h2 className="heading">description</h2>
            <p className="des">{item?.description}</p>
          </div>
          <div className="related__screen">
            <h2>Related Products</h2>
            {/* <div className="related__items">
              <div className="item text-center">
                <div className="item-img">
                  <img
                    alt=""
                    src={process.env.REACT_APP_SERVER_URL + data?.[0]?.url}
                  />
                </div>
                <div>
                  <p className="mt-3"> Item 1 </p>
                  <p className="text-danger"> 000 VNĐ</p>
                  <button className="btn btn-dark mb-3">Add to cart</button>
                </div>
              </div>
              <div className="item text-center">
                <div className="item-img">
                  <img alt="" src={imgdemo1} />
                </div>
                <div>
                  <p className="mt-3"> Item 1 </p>
                  <p className="text-danger"> 000 VNĐ</p>
                  <button 
                  className="btn btn-dark mb-3" 
                  >
                    Add to cart
                    
                  </button>
                </div>
              </div>
              <div className="item text-center">
                <div className="item-img">
                  <img alt="" src={imgdemo} />
                </div>
                <div>
                  <p className="mt-3"> Item 1 </p>
                  <p className="text-danger"> 000 VNĐ</p>
                  <button className="btn btn-dark mb-3">Add to cart</button>
                </div>
              </div>
            </div> */}
          </div>
        
        </>
      }
      <Footer />
    </div>
  );
};

export default Item;
