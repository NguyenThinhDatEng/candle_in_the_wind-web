import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { CartContext } from "../../context/Context";

export default function Header() {
  const { cart, setSearchFilter, searchFilter } = useContext(CartContext);
  const [total, setTotal] = useState();
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr?.quantity), 0));
  }, [cart]);
  useEffect(() => {
    const clearFilterSearch = setTimeout(()=>{
      setSearchFilter(searchTerm)
      console.log(searchFilter)
    }, 500)
    return () => {
      clearTimeout(clearFilterSearch)
    }
  }, [searchTerm])
  if (localStorage.getItem("user-info")) {
    return (
      <header>
        <div className="search">
          <div className="search-container">
            <input
              type="text"
              id="search-bar"
              placeholder="Search product..."
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <a href="#">
              <img
                className="search-icon"
                src="/assets/icons/Search-icon.png"
              />
            </a>
          </div>
        </div>
        <nav className="navigation">
          <div className="logo">
            <img src="/assets/images/Logo.png" alt="Logo" />
          </div>
          <ul className="link_webpages">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/store">STORE</Link>
            </li>
            <li>
              <Link to="/blog">BLOG</Link>
            </li>
            <li>
              <Link to="/about-us">ABOUT US</Link>
            </li>
          </ul>
          <div className="icon_nav">
            <div className="user">
              <Link to="/profile">
                <img src="/assets/icons/User-icon.png" />
              </Link>
            </div>
            <div className="cart">
              <Link to="/cart">
                <img src="/assets/icons/ShoppingCart.png" />
              </Link>
              <span className="badge badge-warning" id="lblCartCount">
                {total}
              </span>
            </div>
          </div>
          {/* <div className='sign'>
                        <div className='in'><Link to="/login" >Sign in</Link></div>
                        <div className='up'><Link to="/signup" >Sign up</Link></div>
                    </div> */}
        </nav>
      </header>
    );
  } else
    return (
      <header>
        <div className="search">
          <div className="search-container">
            <input
              type="text"
              id="search-bar"
              placeholder="Search product..."
            />
            <a href="#">
              <img
                className="search-icon"
                src="/assets/icons/Search-icon.png"
              />
            </a>
          </div>
        </div>
        <nav className="navigation">
          <div className="logo">
            <img src="/assets/images/Logo.png" alt="Logo" />
          </div>
          <ul className="link_webpages">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/store">STORE</Link>
            </li>
            <li>
              <Link to="/blog">BLOG</Link>
            </li>
            <li>
              <Link to="/about-us">ABOUT US</Link>
            </li>
          </ul>
          <div className="icon_nav">
            {/* <div className="user">
                        <Link to="/profile" ><img src="/assets/icons/User-icon.png" /></Link>
                    </div> */}
            <div className="cart">
              <Link to="/cart">
                <img src="/assets/icons/ShoppingCart.png" />
              </Link>
              <span className="badge badge-warning" id="lblCartCount">
                {total}
              </span>
            </div>
          </div>
          <div className="sign">
            <div className="in">
              <Link to="/login">Sign in</Link>
            </div>
            <div className="up">
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </nav>
      </header>
    );
}
