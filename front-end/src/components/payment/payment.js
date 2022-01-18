import React, { useContext, useEffect, useState } from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/Context'
import { createOrderAPI, createOrderItemAPI, deleteCartItemsAPI } from '../../services/itemService'
import './payment.css'
import { useAlert } from 'react-alert'
import axios from 'axios'

export default function Payment() {
    const {cart, price, province, addPaymentMethod, setLoadTotal, loadTotal, fullName, phoneNumber, address, paymentMethod, removePaymentMethod} = useContext(CartContext)
    const [loyal, setLoyal] = useState(false)
    const [ship, setShip] = useState()
    useEffect(() => {
        setShip((localStorage.getItem('province') === "\"Hà Nội\"")? 0 : 2)
        
    }, [province])
    useEffect(() => {
    (async () => {
        const result = await axios(
        process.env.REACT_APP_SERVER_URL + "/customers/getLoyal/" + JSON.parse(localStorage.getItem('user-info')).id
        );
        console.log(result.data)
        setLoyal(result.data, () => {console.log(loyal)})
        
    })();
    }, []);
    
    const loyalDiscount = 95/100
    const grandTotal = (Number(price)+Number(ship)).toFixed(2)
    const loyalSave = ((Number(price)) * Number(1 - loyalDiscount)).toFixed(2)
    const totalPaid = grandTotal - loyalSave
    const alert = useAlert()

    const handleComplete = () => {
        const data = {
            fullname: fullName,
            customer: JSON.parse(localStorage.getItem('user-info')).id,
            email: JSON.parse(localStorage.getItem('user-info')).email,
            phoneNumber: phoneNumber,
            address: address,
            payment: paymentMethod==="onDelivery" ? "Delivery" : "Bank_transfer",
            published_at: "",
            grand_total: loyal === false ? grandTotal : JSON.parse(localStorage.getItem('province')) === "Hà Nội" ? totalPaid : grandTotal*loyalDiscount

        }
        console.log(data)
        async function run() {
            const returnData = await createOrderAPI(data)
            console.log(returnData.data._id)
            cart.map((prod) => (
                createOrderItemAPI({
                    order: returnData.data._id,
                    product: prod.product,
                    quantity: prod.quantity,
                    product_price: Number(prod.price) * (100 - Number(prod.discount)) / 100
                })
            ))
            deleteCartItemsAPI(JSON.parse(localStorage.getItem('user-info')).cart)
            // callOldCart(result.data.data)
        }
        run()
        setLoadTotal(true)
        
        console.log(loadTotal)
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
                            {/* <h5 >Order ID: 000000</h5> */}
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
                                        <tr key={prod?.product}>
                                            <td data-th="Product">
                                                <div className="row">
                                                    <div className="col-md-3 text-left">
                                                        <img src={process.env.REACT_APP_SERVER_URL + prod?.url} alt={prod?.name} style={{ width: '36px', height: '45px', bodyRadius: '2px', 'border':'0.1px solid #000',marginRight: '30px',marginBottom:'5px',}} />
                
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-th="Product">
                                                <div className="col-md-9 text-left mt-sm-2">
                                                    <h7>{prod?.name}</h7>
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
                                        <td data-th="totalProducts">
                                            ${
                                                price
                                            }</td>
                                    </tr>
                                    <tr>
                                        <td data-th="shippingFee">Shipping fee</td>
                                        <td data-th="shipping">
                                            ${
                                                // JSON.parse(localStorage.getItem('user-info')).loyal ? ship : 0
                                                ship
                                            }</td>
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
                                    {
                                        !loyal ? (
                                            <tr>
                                                <td data-th="totalAll">Total amount of goods</td>
                                                <td data-th="totalProductsShip">$
                                                    {
                                                        grandTotal
                                                    }
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td data-th="totalAll">Total amount of goods:</td>
                                                    <td data-th="totalProductsShip">$
                                                        {
                                                            grandTotal
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td data-th="totalAll">Loyal discount:</td>
                                                    <td data-th="totalProductsShip" style={{color: '#ee4d2d'}}>-$
                                                        {
                                                            loyalSave
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td data-th="totalAll">Total</td>
                                                    <td data-th="totalProductsShip">$
                                                        {
                                                            totalPaid.toFixed(2)
                                                        }
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
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
                                    <div className='bankInfo'>
                                        
                                        <h6>_______Vietinbank_______</h6>
                                        <h7>Account number: 1010012380</h7>
                                        <h7>Acount holder: CANDLE IN THE WIND</h7>
                                        <h7>Content: "User's name"</h7>
                                     
                                        
                                    </div>
                                </div>
                            </form>
                            <div>
                                    {
                                        JSON.parse(localStorage.getItem('paymentMethod')) ?  (
                                            <Link to="/" className="completePayment" onClick={() => handleComplete()} >
                                                <div className="btn_complete">
                                                    Complete
                                                </div>
                                            </Link>
                                        ) : (
                                            <Link to={window.location.pathname} className="completePayment" onClick={() => alert.show('Choose your payment method')} >
                                                <div className="btn_complete">
                                                    Complete
                                                </div>
                                            </Link>
                                        )
                                    }
                                   
                                    <Link to="/paymentinformation" className="completePayment" onClick={()=> {removePaymentMethod()}} >
                                        <div className="btn_back">
                                            Back
                                        </div>
                                    </Link>
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
