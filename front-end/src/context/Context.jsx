import React, { createContext, useState, useReducer, useEffect } from 'react';
import CartReducer from "./CartReducer"

export const CartContext = createContext()

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    price: localStorage.getItem('price') ? JSON.parse(localStorage.getItem('price')) : 0,
    
    name: "",
    phoneNumber: "",
    province: "", 
    address:""
    
}
// setCart(cart) => this.cart = cart

const Context = (props) => {
    const [state, dispatch] = useReducer(CartReducer,initialState)
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
        localStorage.setItem('price', JSON.stringify((state.price)))
        localStorage.setItem('name', JSON.stringify(state.name))
        localStorage.setItem('phoneNumber', JSON.stringify(state.phoneNumber))
        localStorage.setItem('province', JSON.stringify(state.province))
        localStorage.setItem('address', JSON.stringify(state.address))
    }, [state])

    const addItemToCart = (data) => {
        dispatch({type: "ADD_ITEM_TO_CART", payload: (data)})
    }

    const removeItemFromCart = (id) => {
        dispatch({type: "REMOVE_ITEM_FROM_CART", payload: id})
    }

    const addPrice = (price) => {
        dispatch({type: "ADD_PRICE", payload: Number(price)})
    }

    

    // dispatch({type, payload})

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                price: state.price,
                addItemToCart,
                removeItemFromCart,
                addPrice
                
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default Context

