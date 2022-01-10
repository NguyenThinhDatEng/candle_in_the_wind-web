import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/Context";

require("dotenv").config();

export default function StoreDecoration(props) {
  const data = props.data;
  const {cart, addItemToCart, updateItemFromCart} = useContext(CartContext)
  return data.map((value) => {
    // console.log(value);
    if (value?.catalog?.name === "decoration") {
      return (
        <div className="col" style={{marginBottom: '30px'}}>
          <div className="item text-center">
          {
            value?.discount !== 0 ? (
              
              <span className="discount-tag" 
              style={{
                position: "absolute", 
                background:"black",
                padding: "5px",
                borderRadius: "5px",
                color: "#ff7d7d",
                right: "10px",
                top: "10px",
                textTransform: "capitalize",
                }}>
                {value?.discount}% Off
              </span>
            ) : null
          }
            <Link to={`/products/${value._id}`}>
              <div className="item-img">
                <img
                  alt=""
                  src={
                    process.env.REACT_APP_SERVER_URL +
                    value?.avatar?.url
                  }
                />
              </div>
            </Link>

            <div>
              <Link to={`/products/${value._id}`} className='productName'>
              <p className="mt-3" style={{height:'40px'}}> 
													{
														(value.name.length > 50) ?(
															<>{value.name.substring(0,50)+"..."}</>
														):(
															<>{value.name}</>
														)																								
													} 
												</p>	
              </Link>
              <p className="text-danger"> ${value.price}</p>
              <button 
              className="btn btn-dark mb-3"
              onClick={()=>{
                if (cart.find((prod) => prod?.data?._id === value?._id)){
                  updateItemFromCart(value, 1)
                  console.log(value?._id)
                console.log("Update")
                }
                else {
                  addItemToCart({data:value, quantity:1})
                  console.log(value?._id)
                  console.log("Add")
                }
                
                }} 
              >Add to cart</button>
            </div>
          </div>
        </div>
      );
    }
  });
}
