import React, { useContext,  useState } from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/Context'
import './payment.css'
import { useAlert } from 'react-alert'
import validator from 'validator' 

export default function PaymentInformation() {
    const [Name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [province, setProvince] = useState('')
    const [address, setAddress] = useState('')
    const alert = useAlert()

    const {changeInfoName, changeInfoPhoneNumber, changeInfoProvince, changeInfoAddress} = useContext(CartContext)


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
                        <h5 className="info">Recipient's name</h5>
                        <input className="infoInput" type="text" required onChange={(e) => {
                            setName(e.target.value)
                            console.log(Name)
                        }}/>
                    </div>
                    <div className="fillPaymentInfo">
                        <h5 className="info">Phone number</h5>
                        <input className="infoInput" type="tel" defaultValue={phoneNumber} required onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                    </div>
                    <div className="fillPaymentInfo">
                        <h5 className="info">Province</h5>
                        <input className="infoInput" list="provinceList" required onChange={(e) => {setProvince(e.target.value)}}/>
                        <datalist id="provinceList">
                            <option value="Hà Nội" />
                            <option value="Khác" />
                        </datalist>
                    </div>
                    <div className="fillPaymentInfo">
                        <h5 className="info">Address</h5>
                        <input className="infoInput" type="text" required onChange={(e) => {setAddress(e.target.value)}}/>
                    </div>
                    <div className="fillPaymentInfo">
                        <div className="btn_backToCart">
                            <Link to="/cart" className="backToCart">Back to cart</Link>
                        </div>
                        <div className="btn_confirm_paymentInfo">
                            {(!Name || !phoneNumber || !province || !address) ? (
                                <Link className="backToCart" onClick={() => alert.error('Missing required fields')}>Confirm</Link>
                            ) : (phoneNumber.length < 10 && !validator.isMobilePhone(phoneNumber)) ? (
                                <Link className="backToCart" onClick={() => alert.error('Invalid phone number')}>Confirm</Link>
                            ) : (
                                <Link to="/payment" className="backToCart" onClick={() => handleOnClick()}>Confirm</Link>
                                
                            ) }
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
