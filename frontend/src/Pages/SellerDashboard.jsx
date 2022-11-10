import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

import {
  Heading,
  Stack,
  Button,
  HStack,
  Skeleton,
} from '@chakra-ui/react';
import { SellerCard } from "../Components/SellerCard";
import { useState } from "react";

export const SellerDashboard= () => {
    const Navigate= useNavigate();
    const [loading,setLoading]= useState(false);
    const [del,setDel]= useState(false);
    const {token}= useSelector((store)=>store.auth);
    const [products,setProducts]= useState([]);

    const getProducts= () => {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_BASE_URL}/product/seller`,{ headers: {
        Authorization: 'Bearer ' + token 
      }})
      .then((res)=>{
        setProducts(res.data.product);
        setLoading(false);
      })
    }

    useEffect(()=>{
        getProducts();
    },[]);

    const deleteProduct= (id) => {
      setDel(true);
      axios.delete(`${process.env.REACT_APP_BASE_URL}/product/${id}`,{ headers: {
        Authorization: 'Bearer ' + token 
      }})
      .then((res)=>{
        getProducts();
        setDel(false);
      })
    } 

    return <>
    <Stack align={'center'} p="4" >
          <Heading fontSize={'2xl'} textAlign={'center'}>
            Seller Dashboard
          </Heading>
          {/* <Button onClick={()=>Navigate("/addProduct")}>Add Product</Button> */}
    </Stack>
    {loading ? <Skeleton h={1000} w={1200} /> : 
    <HStack justifyContent={"space-around"} flexWrap={"wrap"} mb={5} mt={5} rowGap={10} >
    {products.map((e)=>(
      <SellerCard key={e._id} del={del} product={e} deleteProduct={deleteProduct} />
    ))}
    </HStack>}
      <Button onClick={()=>Navigate("/addProduct")}>Add Product</Button>
    </>
}