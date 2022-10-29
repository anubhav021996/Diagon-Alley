import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

export const SellerDashboard= () => {
    const Navigate= useNavigate();
    const {token}= useSelector((store)=>store.auth);

    useEffect(()=>{
        if(!token){
            Navigate("/");
            return;
        } 
        axios.get(`${process.env.REACT_APP_BASE_URL}/product/seller`,{ headers: {
            Authorization: 'Bearer ' + token 
          }})
          .then((res)=>{
            console.log(res);
          })
    },[token]);

    return <>
    <h1>Seller Dashboard</h1>
    <button onClick={()=>Navigate("/addProduct")}>Add Product</button>
    </>
}