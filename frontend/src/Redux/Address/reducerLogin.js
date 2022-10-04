import { ADDADDRESS } from "./actionLogin";


const initialState={
    address: null
}

export const addressReducer= (state=initialState,{type,payload}) => {
    switch(type){
        case ADDADDRESS:
            return {...state, address: payload};
        default:
            return state;
    }
}