import React, { useContext, useEffect, useState } from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../../context/Context'

export default function PaymentInformation() {
    const [Name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [province, setProvince] = useState('')
    const [address, setAddress] = useState('')

    const {name, changeInfoName, changeInfoPhoneNumber, changeInfoProvince, changeInfoAddress} = useContext(CartContext)


    const handleOnClick = () => {
        changeInfoName(Name)
        changeInfoPhoneNumber(phoneNumber)
        changeInfoProvince(province)
        changeInfoAddress(address)
    }

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
                        <input className="infoInput" type="text" required onChange={(e) => {
                            setName(e.target.value)
                            console.log(Name)
                        }}/>
                    </div>
                    <div className="fillPaymentInfo">
                        <h3 className="info">Phone number</h3>
                        <input className="infoInput" type="tel" required onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                    </div>
                    <div className="fillPaymentInfo">
                        <h3 className="info">Province</h3>
                        <input className="infoInput" list="provinceList" required onChange={(e) => {setProvince(e.target.value)}}/>
                        <datalist id="provinceList">
                            <option value="Hà Nội" />
                            <option value="Khác" />
                        </datalist>
                    </div>
                    <div className="fillPaymentInfo">
                        <h3 className="info">Address</h3>
                        <input className="infoInput" type="text" required onChange={(e) => {setAddress(e.target.value)}}/>
                    </div>
                    <div className="fillPaymentInfo">
                        <div className="btn_backToCart">
                            <Link to="/cart" className="backToCart">Back to cart</Link>
                        </div>
                        <div className="btn_confirm_paymentInfo">
                            <Link to="/payment" className="backToCart" onClick={() => handleOnClick()}>Confirm</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
