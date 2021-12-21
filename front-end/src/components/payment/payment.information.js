import React from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { Link, NavLink } from 'react-router-dom'

export default function PaymentInformation() {
    return (
        <div>
            <Header />
            <div>
                <div className="payment_info_text">
                    <h3 className="yourcart">Payment Information</h3>
                </div>
                <div className="fillPaymentInfoContainer">
                    <div className="fillPaymentInfo">
                        <h3 className="info">Recipient's name</h3>
                        <input className="infoInput" type="text" required />
                    </div>
                    <div className="fillPaymentInfo">
                        <h3 className="info">Phone number</h3>
                        <input className="infoInput" type="tel" required />
                    </div>
                    <div className="fillPaymentInfo">
                        <h3 className="info">Province</h3>
                        <input className="infoInput" list="provinceList" required />
                        <datalist id="provinceList">
                            <option value="Hà Nội" />
                            <option value="Khác" />
                        </datalist>
                    </div>
                    <div className="fillPaymentInfo">
                        <h3 className="info">Address</h3>
                        <input className="infoInput" type="text" />
                    </div>
                    <div className="fillPaymentInfo">
                        <div className="btn_backToCart">
                            <Link to="/cart" className="backToCart">Back to cart</Link>
                        </div>
                        <div className="btn_confirm_paymentInfo">
                            <Link to="/payment" className="backToCart">Confirm</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
