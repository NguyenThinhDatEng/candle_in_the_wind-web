import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Advertise from "./advertise";
import Product from "./product";
import { useEffect } from "react";
require("dotenv").config();

export default function Home() {
	// console.log(process.env.REACT_APP_SERVER_URL)
	// useEffect(() => {
	//   if (localStorage.getItem("user-info")) {
	//     localStorage.removeItem("user-info");
	//   }
	// });
	return (
		<div>
			<Header />
			<Advertise />
			<Product />
			<Footer />
		</div>
	);
}
