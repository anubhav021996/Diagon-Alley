import { ADDTOKEN, ADDUSER } from "./actionLogin";

const initialState={
    token:null,
    user:null
}

export const loginReducer= (state=initialState,{type,payload}) => {
    switch(type){
        case ADDTOKEN:
            return {...state, token: payload};
        case ADDUSER:
            return {...state, user: payload};
        default:
            return state;
    }
}