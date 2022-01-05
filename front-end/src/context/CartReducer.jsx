export default (state, action) => {
    switch (action.type) {

        case "ADD_ITEM_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case "UPDATE_ITEM_FROM_CART":
            return {
                ...state,
                cart: state.cart.map((prod) => prod?.data?._id === action.payload.data?._id ? ({ 
                    data: action.payload.data,
                    quantity: action.payload.quantity + prod?.quantity
                }): prod)
            }

        case "REMOVE_ITEM_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => item?.data?._id !== action.payload),
                
            }

        case "ADD_PRICE":
            return {
                ...state,
                price: JSON.stringify(action.payload)
                
            }

        case "CHANGE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((prod) => prod?.data?._id === action.payload.data._id ? action.payload : prod)
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

        case "RELOAD":
            return {
                ...state,
                cart: []
            }

        default: 
            return state
    }
}