import React from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import imgdemo from './avatar.jpg'
import './item.css'
import './item_check'

const Item = () => {
    return (
        <div>
            <Header/>
            <div className="itemscreen">
                <div className="itemscreen__left">
                    <div className="left__image">
                        <img src={imgdemo} alt="product name" />
                    </div>

                </div>
                <div className="itemscreen__right">
                    <div className="right__info">
                        <p className="right__info__name">Name of the Product</p>
                        <div className="right__info__price">
                            000,000 VND
                        </div>
                        <div className="right__info__category">
                            <p>Category</p>
                            <div className="choice">

                                <input type="radio" name="size" value="1" hidden id="#1"/>
                                <label htmlFor="#1" className="size-radio-btn check">#1</label>
                                <input type="radio" name="size" value="2" hidden id="#2"/>
                                <label htmlFor="#2" className="size-radio-btn">#2</label>
                                <input type="radio" name="size" value="3" hidden id="#3"/>
                                <label htmlFor="#3" className="size-radio-btn">#3</label>
                                <input type="radio" name="size" value="4" hidden id="#4"/>
                                <label htmlFor="#4" className="size-radio-btn">#4</label>
                            </div>
                        </div>
                        <p className="right__info__qty">
                            {/* Qty
                            <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                ))}

                            </select> */}
                            Quantity 
                            <span className="qty__choice">
                                <select name="qty" id="qty">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>

                                </select>
                            </span>
                            
                        </p>
                        <p>
                            <button className="cart-btn" type="button" onClick={()=>{}}>Add to cart</button>
                        </p>
                        <div className="rightscreen__productinfo">
                            <span>
                                <i style={{fontSize: '24px'}} className="fa">&#xf0da;</i> Product Infomation
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="related__screen">
                <h2>Related Product</h2> 
                <div className="related__items">

                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="" />
                        </div>
                        <div>
                            <p className="mt-3"> Item 1 </p>
                            <p className="text-danger"> 000  VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="" />
                        </div>
                        <div>
                            <p className="mt-3"> Item 1 </p>
                            <p className="text-danger"> 000  VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>
                    <div className="item text-center">
                        <div className="item-img">
                            <img alt="" src="" />
                        </div>
                        <div>
                            <p className="mt-3"> Item 1 </p>
                            <p className="text-danger"> 000  VNĐ</p>
                            <button className="btn btn-dark mb-3">Add to cart</button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Item
