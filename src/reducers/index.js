import cartReducer from "./cart"
import { combineReducers } from "redux";
import productsReducer from "./products";
import useReducer from "./user";

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    user: useReducer
});

export default rootReducer;