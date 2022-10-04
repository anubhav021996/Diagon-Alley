import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../Redux/Address/actionLogin";

export const Address= () => {
    const {token}= useSelector((store)=>store.auth);
    const Dispatch= useDispatch();
    
    useEffect(()=>{
        if(!token) return;
        axios.get(`${process.env.REACT_APP_BASE_URL}/address`,{ headers: {
            Authorization: 'Bearer ' + token 
          }}).then((res)=>{
            console.log(res);
            Dispatch(addAddress(res.data));
          })
          .catch((e)=>{
            console.log(e);
          })
    },[token]);

    return <h1>Address</h1>
}