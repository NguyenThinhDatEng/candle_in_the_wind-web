import React from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import Advertise from "./advertise"
import Product from './product'

require("dotenv").config();


export default function Home() {
    // console.log(process.env.REACT_APP_DB_URL)

    return (
        <div>
            <Header/>
            <Advertise/>
            <Product/>
            <Footer/>
        </div>

    )
}
