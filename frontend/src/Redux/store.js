import {combineReducers, legacy_createStore as createStore} from "redux";
import { addressReducer } from "./Address/reducerLogin";
import { loginReducer } from "./Login/reducerLogin";

const rootReducer= combineReducers({
    auth: loginReducer,
    address: addressReducer,
});

export const store= createStore(rootReducer);