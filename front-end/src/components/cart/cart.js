import React from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { Link, NavLink } from 'react-router-dom'

export default function Cart() {
    return (
        <div>
            <Header/>
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h3 className="yourcart">Your Shopping Cart</h3>
                            <p className="numOfProduct">
                                <i className="quantityOfProduct">1</i> products</p>
                            <table id="shoppingCart" className="table table-condensed table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }} />
                                        <th style={{ width: '10%' }}>Quantity</th>
                                        <th style={{ width: '20%' }}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-th="Product">
                                            <div className="row">
                                                <div className="col-md-3 text-left">
                                                    <img src="..\assets\images\product.jpg" alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow " />
                                                </div>
                                                <div className="col-md-9 text-left mt-sm-2">
                                                    <h4>Product Name</h4>
                                                    <div className="button_remove">
                                                        <a href className="btn_remove">Remove</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-th="Quantity">
                                            <input type="number" className="form-control form-control-lg text-center" defaultValue={1} />
                                        </td>
                                        <td data-th="Price" className="price_product">000,000 VND</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="line" />
                            <div className="total">
                                <h4 className="total_text">Total:</h4>
                                <h4 className="total_price">000,000 VND</h4>
                            </div>
                        </div>
                    </div>
                    <div className="btn_confirm">
                        <Link to="/paymentinformation" className="confirm">Confirm</Link>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>


    )
}
