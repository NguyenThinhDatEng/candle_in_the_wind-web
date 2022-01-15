import React, { useContext } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './product.css';
import { CartContext } from "../../context/Context";
import ReactLoading from "react-loading";
import { useAlert } from 'react-alert'

require("dotenv").config();

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
		className={className}
		style={{ ...style, display: "block", background: "black" }}
		onClick={onClick}
	  />
	);
  }
  
  function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
		className={className}
		style={{ ...style, display: "block", background: "black" }}
		onClick={onClick}
	  />
	);
  }

export default function Product() {
	const alert = useAlert()
	// const [data, setData] = useState([]);
	const {cart, addItemToCart, updateItemFromCart, 
		loading, setLoading,
		data
	} = useContext(CartContext)
	// const [loading, setLoading] = useState(true)

	// useEffect(async () => {
	// 	const result = await axios(process.env.REACT_APP_SERVER_URL + "/products/");
	// 	setLoading(false)
	// 	setData(result.data);
	// 	// setAllData(result.data);
	// },[]);

	const settings = {
		infinite: true,
		rows: 1,
		dots: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 4,
		nextArrow: <SampleNextArrow />,
      	prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="container">
			<div className="section-item">
				<h2> Candle </h2>
				{
					loading ?
						<>
							<div className="d-flex justify-content-center">
								<ReactLoading
									type="spinningBubbles"
									color="black"
									height={200}
									width={100}
								/>
							</div>
						</>
						:
						<>
							<Slider {...settings}>
								{data.map((value) => {
									// console.log(value);
									if (value?.catalog?.name === "candle") {
										return (
											<div className="item text-center" key={value?._id}>
												{
													value?.discount !== 0 ? (
														
														<span className="discount-tag" 
														style={{
															position: "absolute", 
															background:"black",
															padding: "5px",
															borderRadius: "5px",
															color: "#ff7d7d",
															right: "10px",
															top: "10px",
															textTransform: "capitalize",
															}}>
															{value?.discount}% Off
														</span>
													) : null
												}
												
												<Link to={`/products/${value._id}`}>
												
													<div className="item-img" style={{objectFit: "contain"}}>
														<img
															
															alt=""
															src={
																process.env.REACT_APP_SERVER_URL +
																value?.avatar?.url
															}
														/>
													</div>
												</Link>
												<div>
													<Link to={`/products/${value._id}`} className='productName'>
														<p className="mt-3" style={{ height: '40px' }}>
															{
																(value.name.length > 50) ? (
																	<>{value.name.substring(0, 50) + "..."}</>
																) : (
																	<>{value.name}</>
																)
															}
														</p>
													</Link>
													{
														value?.discount === 0 ? (
															<p 
															className="text-danger" 
															> 
																${value.price}
															</p>
														):(
															<p className="text-danger"> ${Number(value.price) * (100 - Number(value.discount)) / 100}</p>
														)

													}
													<button
														className="btn btn-dark mb-3"
														onClick={() => {
															if(localStorage.getItem("user-info")){
																if (cart.find((prod) => prod?.product === value?._id)) {
																	updateItemFromCart(value, 1)
																	console.log(value?._id)
																}
																else {
																	addItemToCart({ data: value, quantity: 1 })
																	console.log(value?._id)
																}
															} else {
																alert.show("Please sign in")
															}

														}}
													>Add to cart</button>
												</div>
											</div>
										);
									}
								})}
							</Slider>
						</>
				}
			</div>

			<div className="section-item">
				<h2> Scented wax </h2>
				{
					loading ?
						<>
							<div className="d-flex justify-content-center">
								<ReactLoading
									type="spinningBubbles"
									color="black"
									height={200}
									width={100}
								/>
							</div>
						</>
						:
						<>
							<Slider {...settings}>
								{data.map((value) => {
									// console.log(value);
									if (value?.catalog?.name === "scented wax") {
										return (
											<div className="item text-center" key={value?._id}>
												{
													value?.discount !== 0 ? (
														
														<span className="discount-tag" 
														style={{
															position: "absolute", 
															background:"black",
															padding: "5px",
															borderRadius: "5px",
															color: "#ff7d7d",
															right: "10px",
															top: "10px",
															textTransform: "capitalize",
															}}>
															{value?.discount}% Off
														</span>
													) : null
												}
												<Link to={`/products/${value._id}`}>
													<div className="item-img">
														<img
															alt=""
															src={
																process.env.REACT_APP_SERVER_URL +
																value?.avatar?.url
															}
														/>
													</div>
												</Link>
												<div>
													<Link to={`/products/${value._id}`} className='productName'>
														<p className="mt-3" style={{ height: '40px' }}>
															{
																(value.name.length > 50) ? (
																	<>{value.name.substring(0, 50) + "..."}</>
																) : (
																	<>{value.name}</>
																)
															}
														</p>
													</Link>
													<p className="text-danger"> ${value.price}</p>
													<button
														className="btn btn-dark mb-3"
														onClick={() => {
															if(localStorage.getItem("user-info")){
																if (cart.find((prod) => prod?.product === value?._id)) {
																	updateItemFromCart(value, 1)
																	console.log(value?._id)
																}
																else {
																	addItemToCart({ data: value, quantity: 1 })
																	console.log(value?._id)
																}
															} else {
																alert.show("Please sign in")
															}

														}}
													>Add to cart</button>
												</div>
											</div>
										);
									}
								})}
							</Slider>
						</>
				}

			</div>

			<div className="section-item">
				<h2> Essential oil </h2>
				{
					loading ?
						<>
							<div className="d-flex justify-content-center">
								<ReactLoading
									type="spinningBubbles"
									color="black"
									height={200}
									width={100}
								/>
							</div>
						</>
						:
						<>
							<Slider {...settings}>
								{data.map((value) => {
									// console.log(value);
									if (value?.catalog?.name === "essential oil") {
										return (
											<div className="item text-center" key={value?._id}>
												{
													value?.discount !== 0 ? (
														
														<span className="discount-tag" 
														style={{
															position: "absolute", 
															background:"black",
															padding: "5px",
															borderRadius: "5px",
															color: "#ff7d7d",
															right: "10px",
															top: "10px",
															textTransform: "capitalize",
															}}>
															{value?.discount}% Off
														</span>
													) : null
												}
												<Link to={`/products/${value._id}`}>
													<div className="item-img">
														<img
															alt=""
															src={
																process.env.REACT_APP_SERVER_URL +
																value?.avatar?.url
															}
														/>
													</div>
												</Link>
												<div>
													<Link to={`/products/${value._id}`} className='productName'>
														<p className="mt-3" style={{ height: '40px' }}>
															{
																(value.name.length > 50) ? (
																	<>{value.name.substring(0, 50) + "..."}</>
																) : (
																	<>{value.name}</>
																)
															}
														</p>
													</Link>
													<p className="text-danger"> ${value.price}</p>
													<button
														className="btn btn-dark mb-3"
														onClick={() => {
															if(localStorage.getItem("user-info")){
																if (cart.find((prod) => prod?.product === value?._id)) {
																	updateItemFromCart(value, 1)
																	console.log(value?._id)
																}
																else {
																	addItemToCart({ data: value, quantity: 1 })
																	console.log(value?._id)
																}
															} else {
																alert.show("Please sign in")
															}

														}}
													>Add to cart</button>
												</div>
											</div>
										);
									}
								})}
							</Slider>
						</>
				}

			</div>

			<div className="section-item">
				<h2> Decorations </h2>
				{
					loading ?
						<>
							<div className="d-flex justify-content-center">
								<ReactLoading
									type="spinningBubbles"
									color="black"
									height={200}
									width={100}
								/>
							</div>
						</>
						:
						<>
							<Slider {...settings}>
								{data.map((value) => {
									// console.log(value);
									if (value?.catalog?.name === "decoration") {
										return (
											<div className="item text-center" key={value?._id}>
												{
													value?.discount !== 0 ? (
														
														<span className="discount-tag" 
														style={{
															position: "absolute", 
															background:"black",
															padding: "5px",
															borderRadius: "5px",
															color: "#ff7d7d",
															right: "10px",
															top: "10px",
															textTransform: "capitalize",
															}}>
															{value?.discount}% Off
														</span>
													) : null
												}
												<Link to={`/products/${value._id}`}>
													<div className="item-img">
														<img
															alt=""
															src={
																process.env.REACT_APP_SERVER_URL +
																value?.avatar?.url
															}
														/>
													</div>
												</Link>
												<div>
													<Link to={`/products/${value._id}`} className='productName'>
														<p className="mt-3" style={{ height: '40px' }}>
															{
																(value.name.length > 50) ? (
																	<>{value.name.substring(0, 50) + "..."}</>
																) : (
																	<>{value.name}</>
																)
															}
														</p>
													</Link>
													<p className="text-danger"> ${value.price}</p>
													<button
														className="btn btn-dark mb-3"
														onClick={() => {
															if(localStorage.getItem("user-info")){
																if (cart.find((prod) => prod?.product === value?._id)) {
																	updateItemFromCart(value, 1)
																	console.log(value?._id)
																}
																else {
																	addItemToCart({ data: value, quantity: 1 })
																	console.log(value?._id)
																}
															} else {
																alert.show("Please sign in")
															}
															

														}}
													>Add to cart</button>
												</div>
											</div>
										);
									}
								})}
							</Slider>
						</>
				}
			</div>
		</div>
	);
}
