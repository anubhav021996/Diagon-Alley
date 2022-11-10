import axios from "axios";
import { useEffect, useState } from "react"
import { Badge, Image, Select, Skeleton, Stack, VStack } from '@chakra-ui/react'
import { ProductGrid } from "../Components/Products/ProductGrid";
import { ProductCard } from "../Components/Products/ProductCard";
import { useLocation } from "react-router-dom";
import { Pagination } from "../Components/Pagination";
import { useRef } from "react";

export const Product= () => {
    const [products,setProducts]= useState([]);
    const [loading,setLoading]= useState(false);
    const {state:{cat}}= useLocation();
    const [page,setPage]= useState(1);
    const totalPages= useRef(null);

    useEffect(()=>{
      setLoading(true);
      let api= cat.name=="Goblet of Products" ? `${process.env.REACT_APP_BASE_URL}/product?page=${page}&size=16` : `${process.env.REACT_APP_BASE_URL}/product/category/${cat.name}?page=${page}&size=16`;
        axios.get(api)
        .then((res)=>{
          totalPages.current= res.data.totalPages;
          setProducts(res.data.product);
          setLoading(false);
        });
    },[page]);

    useEffect(()=>{
      setLoading(true);
      setPage(1);
      let api= cat.name=="Goblet of Products" ? `${process.env.REACT_APP_BASE_URL}/product?page=${page}&size=16` : `${process.env.REACT_APP_BASE_URL}/product/category/${cat.name}?page=${page}&size=16`;
        axios.get(api)
        .then((res)=>{
          totalPages.current= res.data.totalPages;
          setProducts(res.data.product);
          setLoading(false);
        });
    },[cat]);

    const handlePageChange= (p) => {
      setPage(p);
    }

    const sortBy= (e) => {
      if(e.target.value=="lth"){
        products.sort((a,b)=>a.price-b.price);
        setProducts([...products]);
      }
      else if(e.target.value=="htl"){
        products.sort((a,b)=>b.price-a.price);
        setProducts([...products]);
      }
      else if(e.target.value=="asc"){
        products.sort((a,b)=>{
          return a.title<b.title ? -1 : a.title>b.title ? 1 : 0;
        });
        setProducts([...products]);
      }
      else if(e.target.value=="dsc"){
        products.sort((a,b)=>{
          return b.title<a.title ? -1 : b.title>a.title ? 1 : 0;
        });
        setProducts([...products]);
      }
    }

    return (
      <>
      <Image w={"100%"} h={{sm:"400"}} src={cat.img} cursor="pointer" />
            <VStack
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
    gap={10}
  >
    <Stack direction={"row"} justifyContent="space-between" width={"100%"} >
    <Badge p={2} fontSize={"l"} cursor="pointer" >{cat.name}</Badge>
<Select placeholder='Sort By' width={200} onChange={sortBy} >
  <option value='lth'>Price - low to high</option>
  <option value='htl'>Price - high to low</option>
  <option value='asc'>Name - ascending</option>
  <option value='dsc'>Name - descending</option>
</Select>
    </Stack>
    
    {!products.length && <Skeleton h={1000} w={1150} />}
    <ProductGrid>
      {products.map((product) => (
        <ProductCard loading={loading} key={product._id} product={product} />
      ))}
    </ProductGrid>
      
     <Pagination currentPage={page} handlePageChange={handlePageChange} totalPages={totalPages.current} />
  </VStack>
  </>
    )
}