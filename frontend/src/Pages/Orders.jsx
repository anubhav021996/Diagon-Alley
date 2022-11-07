import { Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { OrderSection } from "../Components/Orders/OrderSection";

export const Orders= () => {
    const {token}= useSelector((store)=>store.auth);
    const [data,setData]= useState([]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/orders`,{ headers: {
            Authorization: 'Bearer ' + token 
        }})
        .then((res) => {
            res.data.sort((a,b)=>{
                return b.createdAt<a.createdAt ? -1 : b.createdAt>a.createdAt ? 1 : 0;
            });
            setData(res.data);
        });
    },[]);

    return <Stack p={4} >
        <Heading fontSize="2xl" fontWeight="extrabold">
            My Orders
          </Heading>
          <Stack gap={10} p={4}>
        {data.map((el,i)=>(
            <OrderSection key={i} order={el} />
        ))}
        </Stack>
    </Stack>
}