import {combineReducers, legacy_createStore as createStore} from "redux";
import { loginReducer } from "./Login/reducerLogin";

const rootReducer= combineReducers({
    auth: loginReducer,
});

export const store= createStore(rootReducer);