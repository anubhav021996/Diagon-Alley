import { ADDID, ADDITEM } from "./actionCart";

const initialState={
    id: null,
    items: {},
    product_id: [],
    total: 0
}

export const cartReducer= (state=initialState,{type,payload}) => {
    switch(type){
        case ADDITEM:
            let obj={};
            for(let i=0;i<payload.length;i++){
                obj[payload[i]] ? obj[payload[i]]++ : obj[payload[i]]=1;
            }
            return {...state, items: obj, product_id: payload, total: Object.keys(obj).length};
        case ADDID:
            return {...state, id: payload}
        default:
            return state;
    }
}