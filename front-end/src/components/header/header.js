import React from 'react'

export default function Header() {
    return (
        <header>
            <nav className="navigation">
                <div className="logo">
                    <img src="./assets/images/Logo.png" alt="Logo" />
                </div>
                <ul className="link_webpages">
                    <li><a className="active" href="#!">HOME</a></li>
                    <li><a href="#!">STORE</a></li>
                    <li><a href="#!">BLOG</a></li>
                    <li><a href="#!">ABOUT US</a></li>
                </ul>
                <div className="icon_nav">
                    <div className="search">
                        <div className="search_box">
                            <input type="search_box" name="search" placeholder="Search product..." />
                        </div>
                        <div className="search_button">
                            <img src="./assets/icons/Search-icon.png" alt=""/>
                        </div>
                    </div>
                    <div className="user"><a href><img src="./assets/icons/User-icon.png" alt=""/></a></div>
                    <div className="cart"><a href><img src="./assets/icons/ShoppingCart.png" alt=""/></a></div>
                </div>
            </nav>
        </header>


    )
}
