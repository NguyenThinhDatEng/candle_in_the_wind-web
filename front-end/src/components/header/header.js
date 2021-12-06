import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header>

            <div className="search">
                <div className="search-container">
                    <input type="text" id="search-bar" placeholder="Search product..." />
                    <a href="#"><img className="search-icon" src="/assets/icons/Search-icon.png" /></a>
                </div>
            </div>
            <nav className="navigation">
                <div className="logo">
                    <img src="/assets/images/Logo.png" alt="Logo" />
                </div>
                <ul className="link_webpages">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/store" >STORE</Link></li>
                    <li><Link to="/blog" >BLOG</Link></li>
                    <li><Link to="/about-us" >ABOUT US</Link></li>
                </ul>
                <div className="icon_nav">
                    <div className="user"><Link to="/profile" ><img src="/assets/icons/User-icon.png" /></Link></div>
                    <div className="cart"><Link ><img src="/assets/icons/ShoppingCart.png" /></Link></div>
                </div>
                <div className='sign'>
                    <div className='in'><Link to="/login" >Sign in</Link></div>
                    <div className='up'><Link to="/signup" >Sign up</Link></div>
                </div>
            </nav>
        </header>


    )
}
