import axios from "axios";
import { useEffect, useState } from "react"
import { Box, Select, Stack } from '@chakra-ui/react'
import { ProductGrid } from "../Components/Products/ProductGrid";
import { ProductCard } from "../Components/Products/ProductCard";

export const Product= () => {
    const [products,setProducts]= useState([]);

    useEffect(()=>{
        axios.get((`${process.env.REACT_APP_BASE_URL}/product`))
        .then((res)=>setProducts(res.data.product));
    },[]);

    return (
            <Box
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack direction={"row"} mb={10} justifyContent="space-between">
    <Select placeholder='Filer By' width={200}>
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
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