import axios from "axios";
import { useEffect } from "react"
import { useSelector } from "react-redux";

export const Orders= () => {
    const {token}= useSelector((store)=>store.auth);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/orders`,{ headers: {
            Authorization: 'Bearer ' + token 
        }})
        .then((res) => {
            console.log(res);
        });
    },[]);

    return <h1>My Orders</h1>
}