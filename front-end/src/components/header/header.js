import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { CartContext } from "../../context/Context";
import axios from "axios";
import { useAlert } from 'react-alert'


export default function Header() {
  const { cart, setSearchFilter, searchFilter, data, setData } = useContext(CartContext);
  const [total, setTotal] = useState();
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState([]);

  const alert = useAlert()

  useEffect(async () => {
		const result = await axios(process.env.REACT_APP_SERVER_URL + "/products/");
		// setLoading(false)
		setData(result.data);
	});

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

  const handleFilter = (e) => {
    setIsMenuOpen(true)
    const searchWord = e.target.value
    setSearchTerm(searchWord)
    console.log(searchTerm)
    const newFilter = data.filter((value) => {
      return value?.name?.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  /* 
  Filtered results disapear when clicked outside the div 
  */

  const ref = useRef()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isMenuOpen])


  if (localStorage.getItem("user-info")) {
    return (
      <header>
        <div className = 'search_nav'>


          <div className="search">
            <div className="search-container">
              <input
                type="text"
                id="search-bar"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => {
                  
                  handleFilter(e)
                }}
              />
              
                <img
                  className="search-icon"
                  src="/assets/icons/Search-icon.png"
                />
              
              <div className="result" ref={ref}>

                {(isMenuOpen && filteredData.length !== 0) && (
                  <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                      // console.log(value)
                      return (
                        <Link className="dataItem" to={`/products/${value._id}`} target="_blank" key={value._id}>
                          <img
                          src={process.env.REACT_APP_SERVER_URL +
                            value?.avatar?.url}
                          className="dataItemImg"
                          alt={value.name}
                          />
                          <div className="dataItemDetail">
                              <span style={{color: 'black'}}>
                              {
                                (value.name.length > 50) ?(
                                  <>{value.name.substring(0,50)+"..."}</>
                                ):(
                                  <>{value.name}</>
                                )																								
                              } 
                              </span>
                              {
                                value?.discount !== 0 ? (
                                  <div style={{display:'flex', alignItems: 'center'}}>
                                    <span>$ {Number(value.price) * (100 - Number(value?.discount)) / 100}</span>
                                    <div style={{
                                      marginLeft: '8px',
                                      padding: "0px 2px",
                                      border: '1px solid', 
                                      borderRadius: '2px',
                                      fontSize: '12px',
                                      lineHeight: '14px',
                                      fontWeight: '400',
                                      backgroundColor: 'rgb(255,240,241)',
                                      color: "rgb(255, 66, 78)"
                                    }}
                                    >
                                      -{value?.discount}%
                                    </div>
                                  </div>
                                  ) : (
                                  <span style={{color: "black"}}>$ {value.price}</span>
                                )
                                
                              }
                          </div>
                          
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
        </div>
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
              <Link to="/login" onClick={() => {alert.show("Please sign in to continue")}}>
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
