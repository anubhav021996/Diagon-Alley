export const ADDTOKEN= "ADDTOKEN";
export const ADDUSER= "ADDUSER";

export const addToken= (payload) => ({type: ADDTOKEN, payload:payload});
export const addUser= (payload) => ({type: ADDUSER, payload:payload});