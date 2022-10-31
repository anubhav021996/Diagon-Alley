import { ADDID, ADDITEM } from "./actionCart";

const initialState={
    id: null,
    items: [],
    product_id: [],
    obj: {},
}

export const cartReducer= (state=initialState,{type,payload}) => {
    switch(type){
        case ADDITEM:
            let obj={};
            for(let i=0;i<payload.length;i++){
                if(obj[payload[i]._id]) obj[payload[i]._id].count++;
                else{
                    obj[payload[i]._id]= {
                        category: payload[i].category,
                        description: payload[i].description,
                        image: payload[i].image,
                        price: payload[i].price,
                        quantity: payload[i].quantity,
                        title: payload[i].title,
                        id: payload[i]._id,
                        count: 1,
                    };
                    obj[payload[i]._id].count=1;
                }
            }
            let arr= [];
            for(let key in obj) arr.push(obj[key]);
            arr.sort((a,b)=>{
                return a.title<b.title ? -1 : a.title>b.title ? 1 : 0;
            });
            return {...state, items: arr, obj: obj, product_id: payload};
        case ADDID:
            return {...state, id: payload}
        default:
            return state;
    }
}