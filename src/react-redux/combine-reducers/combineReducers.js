import { combineReducers } from 'redux';
import Cart from "../redux-slices/add-cart-data";

const rootReducer = combineReducers({
        Cart: Cart,
});

export default rootReducer;