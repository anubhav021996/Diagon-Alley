import axios from "axios";
import { useEffect, useState } from "react"
import { Badge, Box, Select, Stack } from '@chakra-ui/react'
import { ProductGrid } from "../Components/Products/ProductGrid";
import { ProductCard } from "../Components/Products/ProductCard";
import { useLocation } from "react-router-dom";

export const Product= () => {
    const [products,setProducts]= useState([]);
    const {state:{cat}}= useLocation();

    useEffect(()=>{
      let api= cat=="Goblet of Products" ? `${process.env.REACT_APP_BASE_URL}/product` : `${process.env.REACT_APP_BASE_URL}/product/category/${cat}`;
        axios.get(api)
        .then((res)=>setProducts(res.data.product));
    },[cat]);

    return (
            <Box
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack direction={"row"} mb={10} justifyContent="space-between">
    <Badge p={2} fontSize={"l"}>{cat}</Badge>
<Select placeholder='Sort By' width={200}>
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
    </Stack>
    
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </ProductGrid>
  </Box>
    )
}