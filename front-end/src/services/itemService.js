import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

export const createCartItemsAPI = async(newData) => {
    // let data = newData.map((prod) => ({
    //     product: prod.data.product,
    //     quantity: prod.data.quantity,
    //     cart: prod.cart
    // }))
    console.log(newData)
    let config = {
        method: "POST",
        url: baseUrl + "/cart_items/createItems",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: newData,
    };
    // console.log(data);
    return await axios(config);
};

export const deleteCartItemsAPI = async(id) => {

    let config = {
        method: "DELETE",
        url: baseUrl + "/carts/deleteItems/" + id,
        // headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        // },
    };
    // console.log(data);
    return await axios(config);
};

export const getCartAPI = async(id) => {

    let config = {
        method: "GET",
        url: baseUrl + "/carts/" + id,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    // console.log(data);
    return await axios(config);
};

export const createOrderAPI = async(data) => {
    console.log(data)
    let config = {
        method: "POST",
        url: baseUrl + "/orders",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: data,
    };

    return await axios(config)
}

export const createOrderItemAPI = async(data) => {
    console.log(data)
    let config = {
        method: "POST",
        url: baseUrl + "/items",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: data,
    };

    return await axios(config)
}