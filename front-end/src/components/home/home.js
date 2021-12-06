import React from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import Advertise from "./advertise"
import Product from './product'


export default function Home() {
    

    return (
        <div>
            <Header/>
            <Advertise/>
            <Product/>
            <Footer/>
        </div>

    )
}
