const initialState = {
    cart: [],
};

const Cart = (state = initialState, action) => {
    switch(action.type){
        case "ADD_CART_DATA": return {
            ...state,
            cart: [...state.users, action.payload],
        };
        case "DELETE_CART_DATA": return {
            ...state,
            cart: action.payload,
        };
        default: return state
    }
};

export default Cart;