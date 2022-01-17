export default (state, action) => {
    switch (action.type) {
        case "SET_OLD_CART":
            return {
                ...state,
                cart: action.payload
            }

        case "ADD_ITEM_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case "UPDATE_ITEM_FROM_CART":
            return {
                ...state,
                cart: state.cart.map((prod) => prod?.product === action.payload.product ? ({ 
                    // data: action.payload.data,
                    name: action.payload.name,
                    quantity: action.payload.quantity + prod?.quantity,
                    price: action.payload.price,
                    product: action.payload.product,
                    url: action.payload.url,
                    discount: action.payload.discount,
                }): prod)
            }

        case "REMOVE_ITEM_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => item?.product !== action.payload),
                
            }

        case "ADD_PRICE":
            return {
                ...state,
                price: JSON.stringify(action.payload)
                
            }

        case "CHANGE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((prod) => prod?.product === action.payload.product ? action.payload : prod)
            }
            // console.log(action.payload)

        case "ADD_INFO_NAME":
            return {
                ...state,
                name: (action.payload)
            }
            // console.log(action.payload)
        case "ADD_INFO_PHONE_NUMBER":
            return {
                ...state,
                phoneNumber: (action.payload)
            }
            // console.log(action.payload)
        case "ADD_INFO_PROVINCE":
            return {
                ...state,
                province: (action.payload)
            }
            // console.log(action.payload)
        case "ADD_INFO_ADDRESS":
            return {
                ...state,
                address: (action.payload)
            }
            // console.log(action.payload)
        case "ADD_PAYMENT_METHOD":
            return {
                ...state,
                paymentMethod: (action.payload)
                    
            }

        case "REMOVE_PAYMENT_METHOD":
            return {
                ...state,
                paymentMethod: ""
                    
            }

        case "RELOAD":
            return {
                ...state,
                cart: [],
                price: 0,
                
                name: "",
                phoneNumber: "",
                province: "", 
                address: "",
                paymentMethod: ""
            }

        default: 
            return state
    }
}