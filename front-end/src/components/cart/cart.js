import React, { useContext, useEffect, useState } from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/Context'

export default function Cart() {
    const {cart, removeItemFromCart, addPrice, changeQuantity} = useContext(CartContext)
    const [total, setTotal] = useState()
    const [totalPrice, setTotalPrice] = useState()
    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc+ Number(curr?.quantity) , 0))
        setTotalPrice(cart.reduce((acc, curr) => acc+ Number(curr?.quantity*(curr?.price * (100 - Number(curr?.discount))/100)), 0))
// Number(data?.price) * (100 - Number(data?.discount)) / 100 
    }, [cart])
    // console.log(cart)
    console.log(totalPrice)

    // addPrice(totalPrice)
    return (
        <div>
            <Header/>
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h3 className="yourcart">Your Shopping Cart</h3>
                            <p className="numOfProduct">
                                <i className="quantityOfProduct">
                                    {total}
                                </i> 
                                 products
                            </p>
                            <table id="shoppingCart" className="table table-condensed table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }} />
                                        <th style={{ width: '15%' }} >Quantity</th>
                                        <th style={{ width: '5%' }}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.length > 0 ? (
                                            cart.map((prod) => (
                                                <tr key={prod?.product}>
                                                    <td data-th="Product">
                                                        <div className="row">
                                                            <div className="col-md-3 text-left">
                                                                <img src={process.env.REACT_APP_SERVER_URL + prod?.url} alt="" 
                                                                className="img-fluid d-none d-md-block rounded mb-2 shadow " 
                                                                style ={{width: '90px', height:'120px',objectFit: 'contain'}} />
                                                            </div>
                                                            <div className="col-md-9 text-left mt-sm-2">
                                                                <h4>{prod?.name}</h4>
                                                                <div className="button_remove">
                                                                    <button 
                                                                    style={{backgroundColor:'black','color':'white',borderRadius:'20px','padding':'5px 15px','border':'1px solid black',}}
                                                                    className="btn_remove" 
                                                                    type="button" 
                                                                    onClick={()=>{
                                                                        removeItemFromCart(prod?.product)
                                                                        // console.log(prod?.data?._id)
                                                                        
                                                                    }} 
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td data-th="Quantity">
                                                        <input type="number" min='1' className="form-control form-control-lg text-center" style= {{width: '80px',}}defaultValue={prod?.quantity} onChange={(e) => changeQuantity(prod, e.target.value)} />
                                                    </td>
                                                    <td data-th="Price" className="price_product">${Number(prod?.price) * (100 - Number(prod?.discount)) / 100 }</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <div>
                                                Your cart is empty.
                                                <Link to='/' style={{color: 'black'}}>Go Shopping</Link>
                                            </div>
                                        )
                                    }
                                </tbody>
                            </table>
                            {/* <div className="line" /> */}
                            <div className="total">
                                <h4 className="total_text">Total:</h4>
                                <h4 className="total_price">${(totalPrice)}</h4>
                            </div>
                        </div>
                    </div>
                        {cart.length !== 0 ? (
                            <div className="btn_confirm" >
                                <Link 
                                    to="/paymentinformation" 
                                    className="confirm" 
                                    onClick={()=>{
                                        addPrice(totalPrice)
                                        window.scrollTo(0,0)
                                    }
                                }>

                                        Confirm
                                        
                                </Link>
                            </div>
                        ) : (
                            null
                        )}
                </div>
            </section>
            <Footer/>
        </div>


    )
}
