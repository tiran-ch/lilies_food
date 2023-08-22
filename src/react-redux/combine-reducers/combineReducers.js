import { combineReducers } from 'redux';
import Cart from "../redux-slices/add-cart-data";
import Food from "../redux-slices/food";

const rootReducer = combineReducers({
        Cart: Cart,
        Food: Food,
});

export default rootReducer;