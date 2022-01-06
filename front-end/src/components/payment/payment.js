import React, { useContext, useEffect, useState } from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/Context'
import './payment.css'

export default function Payment() {
    const {cart, price, province, addPaymentMethod, setLoadTotal} = useContext(CartContext)

    const [ship, setShip] = useState()
    useEffect(() => {
        setShip((localStorage.getItem('province') === "\"Hà Nội\"")? 0 : 30000)

    }, [province])

    const handleComplete = () => {
        setLoadTotal((pre) => !pre)
        // window.location.reload(false);
    }

    
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
                            <h5 >Order ID: 000000</h5>
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
                                                        <img src={process.env.REACT_APP_SERVER_URL + prod?.data?.avatar?.url} alt={prod?.data?.name} style={{ width: '36px', height: '45px', 'border-radius': '2px', 'border':'0.1px solid #000','margin-right':'30px','margin-bottom':'5px',}} />
                
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-th="Product">
                                                <div className="col-md-9 text-left mt-sm-2">
                                                    <h7>{prod?.data?.name}</h7>
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
                                        <th style={{ width: '18%' }} />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-th="totalPayment">Total price of products</td>
                                        <td data-th="totalProducts">${price}</td>
                                    </tr>
                                    <tr>
                                        <td data-th="shippingFee">Shipping fee</td>
                                        <td data-th="shipping">${ship}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="linePayment" />
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '70%' }} />
                                        <th style={{ width: '16%' }} />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-th="totalAll">Total</td>
                                        <td data-th="totalProductsShip">${Number(price)+Number(ship)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="column2">
                            <div className="itemCol2Payment">
                                <h5 className="paymentMethod_text">Payment method</h5>
                            </div>
                            <form>
                                <div className="paymentDelivery_text">
                                    <input name="paymentMethod" type="radio" defaultValue="onDelivery" onChange={(e) => {addPaymentMethod(e.target.value)}}/><span />Payment on delivery
                                </div>
                                <div className="paymentDelivery_text">
                                    <input name="paymentMethod" type="radio" defaultValue="viaBank" onChange={(e) => {addPaymentMethod(e.target.value)}} /><span />Payment via bank
                                    <div class='bankInfo'>
                                        
                                        <h6>_______Vietinbank_______</h6>
                                        <h7>Account number: 1010012380</h7>
                                        <h7>Acount holder: CANDLE IN THE WIND</h7>
                                        <h7>Content: "Order ID + User's name"</h7>
                                     
                                        
                                    </div>
                                </div>
                            </form>
                            <div>
                                <div className="btn_complete">
                                    <Link to="/" className="completePayment" onClick={() => handleComplete()} >Complete</Link>
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
