import React, { useContext } from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../../context/Context'

export default function Payment() {
    const {cart, price} = useContext(CartContext)

    const shippingFee = 10000

    return (
        <div>
            <Header />
            <div>
                <div>
                    <div className="payment_info_text">
                        <h3 className="yourcart">Payment</h3>
                    </div>
                    <div className="paymentContainer">
                        <div className="column1">
                            <h3 >Order ID: 000000</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }} />
                                        <th style={{ width: '70%' }} />
                                        <th style={{ width: '10%' }} />
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((prod) => (
                                        <tr key={prod?.data?._id}>
                                            <td data-th="Product">
                                                <div className="row">
                                                    <div className="col-md-3 text-left">
                                                        <img src="..\assets\images\product.jpg" alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow " style={{ width: '50px', height: '60px' }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-th="Product">
                                                <div className="col-md-9 text-left mt-sm-2">
                                                    <h4>{prod?.data?.name}</h4>
                                                </div>
                                            </td>
                                            <td data-th="Quantity">x{prod?.quantity}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                            <div className="linePayment" />
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '70%' }} />
                                        <th style={{ width: '30%' }} />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-th="totalPayment">Total price of products</td>
                                        <td data-th="totalProducts">{price} VND</td>
                                    </tr>
                                    <tr>
                                        <td data-th="shippingFee">Shipping fee</td>
                                        <td data-th="shipping">{shippingFee} VND</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="linePayment" />
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '70%' }} />
                                        <th style={{ width: '30%' }} />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-th="totalAll">Total</td>
                                        <td data-th="totalProductsShip">{Number(price)+Number(shippingFee)} VND</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="column2">
                            <div className="itemCol2Payment">
                                <h3 className="paymentMethod_text">Payment method</h3>
                            </div>
                            <form>
                                <div className="paymentDelivery_text">
                                    <input name="paymentMethod" type="radio" defaultValue="onDelivery" /><span />Payment on delivery
                                </div>
                                <div className="paymentDelivery_text">
                                    <input name="paymentMethod" type="radio" defaultValue="viaBank" /><span />Payment via bank
                                </div>
                            </form>
                            <div>
                                <div className="btn_complete">
                                    <Link to="/" className="completePayment" onClick={()=> localStorage.clear()} >Complete</Link>
                                </div>
                                <div className="btn_back">
                                    <Link to="/paymentinformation" className="completePayment">Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clear" />
            </div>


            <Footer />
        </div>
    )
}
