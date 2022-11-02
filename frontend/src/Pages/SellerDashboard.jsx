import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

import {
  Heading,
  Stack,
  Button,
  HStack,
} from '@chakra-ui/react';
import { SellerCard } from "../Components/SellerCard";
import { useState } from "react";

export const SellerDashboard= () => {
    const Navigate= useNavigate();
    const {token}= useSelector((store)=>store.auth);
    const [products,setProducts]= useState([]);

    const getProducts= () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/product/seller`,{ headers: {
        Authorization: 'Bearer ' + token 
      }})
      .then((res)=>{
        setProducts(res.data.product);
      })
    }

    useEffect(()=>{
        getProducts();
    },[]);

    const deleteProduct= (id) => {
      axios.delete(`${process.env.REACT_APP_BASE_URL}/product/${id}`,{ headers: {
        Authorization: 'Bearer ' + token 
      }})
      .then((res)=>{
        getProducts();
      })
    } 

    return <>
    <Stack align={'center'} p="4" >
          <Heading fontSize={'2xl'} textAlign={'center'}>
            Seller Dashboard
          </Heading>
    </Stack>
    <HStack justifyContent={"space-around"} flexWrap={"wrap"} mb={5} mt={5} rowGap={10} >
    {products.map((e)=>(
      <SellerCard key={e._id} product={e} deleteProduct={deleteProduct} />
    ))}
    </HStack>
      <Button onClick={()=>Navigate("/addProduct")}>Add Product</Button>
    </>
}