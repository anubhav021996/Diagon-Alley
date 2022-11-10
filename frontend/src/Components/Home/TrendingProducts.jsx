import { Heading, Skeleton, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProductGrid } from "../Products/ProductGrid";
import { TrendingCard } from "./TrendingCard";

export const TrendingProducts= () => {
    const[trending,setTrending]= useState([]);
    const[loading,setLoading]= useState(false);

    useEffect(()=>{
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/product?page=1&size=4`)
        .then((res)=>{
          setTrending(res.data.product);
          setLoading(false);
        });
    },[]);

    if(loading) return <Skeleton m={10} p={5} h={350} />

    return(
        <VStack m={10} p={5} boxShadow= "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
        <Heading>Trending Products</Heading>
        <ProductGrid pt={5} >
            {trending.map((e)=><TrendingCard key={e._id} id={e._id} title={e.title} cat={e.category} image={e.image}  />)}
        </ProductGrid>
        </VStack>
    )
}