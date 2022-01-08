import React, { createContext, useReducer, useEffect, useState } from 'react';
import CartReducer from "./CartReducer"

export const CartContext = createContext()

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    price: localStorage.getItem('price') ? JSON.parse(localStorage.getItem('price')) : 0,
    
    name: localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : "",
    phoneNumber: localStorage.getItem('phoneNumber') ? JSON.parse(localStorage.getItem('phoneNumber')) : "",
    province: localStorage.getItem('province') ? JSON.parse(localStorage.getItem('province')) : "", 
    address: localStorage.getItem('province') ? JSON.parse(localStorage.getItem('province')) : "",
    paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ""
}
// setCart(cart) => this.cart = cart

const Context = (props) => {
    const [state, dispatch] = useReducer(CartReducer,initialState)

    const [loadTotal, setLoadTotal] = useState(false)
    const [searchFilter, setSearchFilter] = useState("")
    const [data, setData] = useState([])
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
        localStorage.setItem('price', JSON.stringify((state.price)))
        localStorage.setItem('name', JSON.stringify(state.name))
        localStorage.setItem('phoneNumber', JSON.stringify(state.phoneNumber))
        localStorage.setItem('province', JSON.stringify(state.province))
        localStorage.setItem('address', JSON.stringify(state.address))
        localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))

    }, [state])

    useEffect(() => {
        console.log(loadTotal)
        if(loadTotal === true){
            dispatch({type: "RELOAD"})
            setLoadTotal(false)
        }

    }, [loadTotal])


    const addItemToCart = (data) => {
        dispatch({type: "ADD_ITEM_TO_CART", payload: (data)})
    }
    
    const updateItemFromCart = (data, quantity) => {
        const newData = {
            data: data,
            quantity: Number(quantity)
        }
        dispatch({type: "UPDATE_ITEM_FROM_CART", payload: (newData)})
    }

    const removeItemFromCart = (id) => {
        dispatch({type: "REMOVE_ITEM_FROM_CART", payload: id})
    }

    const addPrice = (price) => {
        dispatch({type: "ADD_PRICE", payload: Number(price)})
    }

    const changeQuantity = (data, quantity) => {
        const newData = {
            data: data?.data,
            quantity: Number(quantity)
        }
        dispatch({type:"CHANGE_QUANTITY", payload: newData})
        // console.log(data, quantity)
    }

    const changeInfoName = (name) => {
        dispatch({type: "ADD_INFO_NAME", payload: (name)})
        console.log(name)
    }
    const changeInfoPhoneNumber = (name) => {
        dispatch({type: "ADD_INFO_PHONE_NUMBER", payload: (name)})
        console.log(name)
    }
    const changeInfoProvince = (name) => {
        dispatch({type: "ADD_INFO_PROVINCE", payload: (name)})
        console.log(name)
    }
    const changeInfoAddress = (name) => {
        dispatch({type: "ADD_INFO_ADDRESS", payload: (name)})
        console.log(name)
    }

    const addPaymentMethod = (method) => {
        dispatch({type: "ADD_PAYMENT_METHOD", payload: (method)})
    }
    

    // dispatch({type, payload})

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                price: state.price,
                searchFilter,
                loadTotal,
                data,
                addItemToCart,
                updateItemFromCart,
                removeItemFromCart,
                addPrice,
                changeQuantity,
                changeInfoName,
                changeInfoPhoneNumber,
                changeInfoProvince,
                changeInfoAddress,
                addPaymentMethod,
                setLoadTotal,
                setSearchFilter,
                setData
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default Context

