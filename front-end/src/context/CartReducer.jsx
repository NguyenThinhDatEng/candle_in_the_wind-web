export default (state, action) => {
    switch (action.type) {

        case "ADD_ITEM_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case "REMOVE_ITEM_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
                
            }

        case "ADD_PRICE":
            return {
                ...state,
                price: JSON.stringify(action.payload)
                
            }

        default: 
            return state
    }
}