export const ADDITEM= "ADDITEM";
export const ADDID= "ADDID"

export const addItem= (payload) => ({type: ADDITEM, payload:payload});
export const addId= (payload) => ({type: ADDID, payload:payload});