import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { CartContext } from "../../context/Context";
import axios from "axios";
import { useAlert } from "react-alert";
import {
  deleteCartItemsAPI,
  createCartItemsAPI,
} from "../../services/itemService";

export default function Header() {
  const {
    cart,
    setSearchFilter,
    searchFilter,
    data,
    setData,
    setLoadTotal,
    setLoading,
  } = useContext(CartContext);
  const [total, setTotal] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  // const [homeHeader, sethomeHeader] = useState("");
  const alert = useAlert();

  useEffect(() => {
    (async () => {
      const result = await axios(
        process.env.REACT_APP_SERVER_URL + "/products/"
      );
      setLoading(false);

      setData(result.data);
    })();
  }, []);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr?.quantity), 0));
  }, [cart]);

  useEffect(() => {
    const clearFilterSearch = setTimeout(() => {
      setSearchFilter(searchTerm);
      console.log(searchFilter);
    }, 500);
    return () => {
      clearTimeout(clearFilterSearch);
    };
  }, [searchTerm]);

  const handleFilter = (e) => {
    setIsMenuOpen(true);
    const searchWord = e.target.value;
    setSearchTerm(searchWord);
    console.log(searchTerm);
    const newFilter = data.filter((value) => {
      return value?.name?.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  /* 
	Filtered results disapear when clicked outside the div 
	*/

  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);
  if (localStorage.getItem("user-info")) {
    return (
      <header className="" style={{ marginBottom: "120px" }}>
        <nav className="navigation fixed-top">
          <div className="logo">
            <img className="lg" src="/assets/images/Logo.png" alt="Logo" />
          </div>
          <ul className="link_webpages">
            <li>
              {window.location.pathname === "/" ? (
                <Link to="/" className="active">
                  HOME
                </Link>
              ) : (
                <Link to="/" className="">
                  HOME
                </Link>
              )}
            </li>
            <li>
              {window.location.pathname === "/store" ? (
                <Link to="/store" className="active">
                  STORE
                </Link>
              ) : (
                <Link to="/store" className="">
                  STORE
                </Link>
              )}
            </li>
            <li>
              {window.location.pathname === "/blog" ? (
                <Link to="/blog" className="active">
                  BLOG
                </Link>
              ) : (
                <Link to="/blog" className="">
                  BLOG
                </Link>
              )}
            </li>
            <li>
              {window.location.pathname === "/about-us" ? (
                <Link to="/about-us" className="active">
                  ABOUT US
                </Link>
              ) : (
                <Link to="/about-us" className="">
                  ABOUT US
                </Link>
              )}
            </li>
          </ul>
          <div className="icon_nav">
            <div className="search-container">
              <input
                type="text"
                id="search-bar"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => {
                  handleFilter(e);
                }}
              />

              <img
                className="search-icon"
                src="/assets/icons/Search-icon.png"
              />

              {/* Searching product */}

              <div className="result" ref={ref}>
                {isMenuOpen && filteredData.length !== 0 && (
                  <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => (
                      <Link
                        className="dataItem"
                        to={`/products/${value._id}`}
                        // target="_blank"
                        key={value._id}
                      >
                        <img
                          src={
                            process.env.REACT_APP_SERVER_URL +
                            value?.avatar?.url
                          }
                          className="dataItemImg"
                          alt={value.name}
                        />
                        <div className="dataItemDetail">
                          <span style={{ color: "black" }}>
                            {value.name.length > 50 ? (
                              <>{value.name.substring(0, 50) + "..."}</>
                            ) : (
                              <>{value.name}</>
                            )}
                          </span>
                          {value?.discount !== 0 ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span>
                                ${" "}
                                {(Number(value.price) *
                                  (100 - Number(value?.discount))) /
                                  100}
                              </span>
                              <div
                                style={{
                                  marginLeft: "8px",
                                  padding: "0px 2px",
                                  border: "1px solid",
                                  borderRadius: "2px",
                                  fontSize: "12px",
                                  lineHeight: "14px",
                                  fontWeight: "400",
                                  backgroundColor: "rgb(255,240,241)",
                                  color: "rgb(255, 66, 78)",
                                }}
                              >
                                -{value?.discount}%
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: "black" }}>
                              $ {value.price}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="user">
              {/* <Link to="/profile">
                  <img src="/assets/icons/User-icon.png" />
                </Link> */}
              <button class="usericon">
                <img src="../assets/icons/User-icon.png" />
              </button>
              <ul>
                <Link to="/profile">
                  <li>My profile</li>
                </Link>

                <Link
                  to="/"
                  onClick={() => {
                    const data = cart;
                    const cart_id = JSON.parse(
                      localStorage.getItem("user-info")
                    ).cart;
                    const newData = data.map((prod) => ({
                      product: prod.product,
                      quantity: prod.quantity,
                      cart: cart_id,
                    }));
                    // console.log(newData)
                    deleteCartItemsAPI(
                      JSON.parse(localStorage.getItem("user-info")).cart
                    );
                    createCartItemsAPI(newData);
                    setLoadTotal(true);
                    localStorage.clear();
                  }}
                >
                  <li>Sign out</li>
                </Link>
              </ul>
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
        {/* </div> */}
      </header>
    );
  } else
    return (
      <header style={{ marginBottom: "120px" }}>
        <nav className="navigation fixed-top">
          <div className="logo">
            <img className="lg" src="/assets/images/Logo.png" alt="Logo" />
          </div>
          <ul className="link_webpages">
            <li>
              {window.location.pathname === "/" ? (
                <Link to="/" className="active">
                  HOME
                </Link>
              ) : (
                <Link to="/" className="">
                  HOME
                </Link>
              )}
            </li>
            <li>
              {window.location.pathname === "/store" ? (
                <Link to="/store" className="active">
                  STORE
                </Link>
              ) : (
                <Link to="/store" className="">
                  STORE
                </Link>
              )}
            </li>
            <li>
              {window.location.pathname === "/blog" ? (
                <Link to="/blog" className="active">
                  BLOG
                </Link>
              ) : (
                <Link to="/blog" className="">
                  BLOG
                </Link>
              )}
            </li>
            <li>
              {window.location.pathname === "/about-us" ? (
                <Link to="/about-us" className="active">
                  ABOUT US
                </Link>
              ) : (
                <Link to="/about-us" className="">
                  ABOUT US
                </Link>
              )}
            </li>
          </ul>
          <div className="icon_nav">
            <div className="search-container">
              <input
                type="text"
                id="search-bar"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => {
                  handleFilter(e);
                }}
              />

              <img
                className="search-icon"
                src="/assets/icons/Search-icon.png"
              />

              <div className="result" ref={ref}>
                {isMenuOpen && filteredData.length !== 0 && (
                  <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                      // console.log(value)
                      return (
                        <Link
                          className="dataItem"
                          to={`/products/${value._id}`}
                          // target="_blank"
                          key={value._id}
                        >
                          <img
                            src={
                              process.env.REACT_APP_SERVER_URL +
                              value?.avatar?.url
                            }
                            className="dataItemImg"
                            alt={value.name}
                          />
                          <div className="dataItemDetail">
                            <span style={{ color: "black" }}>
                              {value.name.length > 50 ? (
                                <>{value.name.substring(0, 50) + "..."}</>
                              ) : (
                                <>{value.name}</>
                              )}
                            </span>
                            {value?.discount !== 0 ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span>
                                  ${" "}
                                  {(Number(value.price) *
                                    (100 - Number(value?.discount))) /
                                    100}
                                </span>
                                <div
                                  style={{
                                    marginLeft: "8px",
                                    padding: "0px 2px",
                                    border: "1px solid",
                                    borderRadius: "2px",
                                    fontSize: "12px",
                                    lineHeight: "14px",
                                    fontWeight: "400",
                                    backgroundColor: "rgb(255,240,241)",
                                    color: "rgb(255, 66, 78)",
                                  }}
                                >
                                  -{value?.discount}%
                                </div>
                              </div>
                            ) : (
                              <span style={{ color: "black" }}>
                                $ {value.price}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {localStorage.getItem("user-info") ? (
              <>
                <div className="user">
                  <Link to="/profile">
                    <img src="/assets/icons/User-icon.png" />
                  </Link>
                  {/* <button class = 'usericon'><img src = "../assets/icons/User-icon.png"/></button>
        
										<ul>
											<li><Link to="/profile">My profile</Link></li>
											<li><Link to="/profile">Sign out</Link></li>
										</ul> */}
                </div>
              </>
            ) : (
              <>
                <div className="sign">
                  <div className="in">
                    <Link to="/login">Sign in</Link>
                  </div>
                  <div className="up">
                    <Link to="/signup">Sign up</Link>
                  </div>
                </div>
              </>
            )}
            <div className="cart">
              <Link
                to="/login"
                onClick={() => alert.show("Please Sign in first")}
              >
                <img src="/assets/icons/ShoppingCart.png" />
              </Link>
              <span className="badge badge-warning" id="lblCartCount">
                {total}
              </span>
            </div>
          </div>
        </nav>
        {/* </div> */}
      </header>
    );
}
