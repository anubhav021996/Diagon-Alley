import {combineReducers, legacy_createStore as createStore} from "redux";
import { cartReducer } from "./Cart/reducerCart";
import { loginReducer } from "./Login/reducerLogin";

const rootReducer= combineReducers({
    auth: loginReducer,
    cart: cartReducer,
});

export const store= createStore(rootReducer);