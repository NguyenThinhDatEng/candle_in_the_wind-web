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
        setTotalPrice(cart.reduce((acc, curr) => acc+ Number(curr?.quantity*curr?.data?.price), 0))

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
                                <i className="quantityOfProduct">{total}</i> products</p>
                            <table id="shoppingCart" className="table table-condensed table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }} />
                                        <th style={{ width: '10%' }} >Quantity</th>
                                        <th style={{ width: '20%' }}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.length > 0 ? (
                                            cart.map((prod) => (
                                                <tr key={prod?.data?._id}>
                                                    <td data-th="Product">
                                                        <div className="row">
                                                            <div className="col-md-3 text-left">
                                                                <img src={process.env.REACT_APP_SERVER_URL + prod?.data?.avatar?.url} alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow " />
                                                            </div>
                                                            <div className="col-md-9 text-left mt-sm-2">
                                                                <h4>{prod?.data?.name}</h4>
                                                                <div className="button_remove">
                                                                    <button 
                                                                    className="btn_remove" 
                                                                    type="button" 
                                                                    onClick={()=>{
                                                                        removeItemFromCart(prod?.data?._id)
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
                                                        <input type="number" min='1' className="form-control form-control-lg text-center" defaultValue={prod?.quantity} onChange={(e) => changeQuantity(prod, e.target.value)} />
                                                    </td>
                                                    <td data-th="Price" className="price_product">{prod?.data?.price} VND</td>
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
                            <div className="line" />
                            <div className="total">
                                <h4 className="total_text">Total:</h4>
                                <h4 className="total_price">{totalPrice} VND</h4>
                            </div>
                        </div>
                    </div>
                    <div className="btn_confirm">
                        <Link to="/paymentinformation" className="confirm" onClick={()=>addPrice(totalPrice)} >

                                Confirm
                                
                        </Link>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>


    )
}
