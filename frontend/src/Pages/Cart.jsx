import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as ReachLink } from "react-router-dom";
import { AddressItem } from '../Components/Cart/AddressItem'
import { CartItem } from '../Components/Cart/CartItem'
import { CartOrderSummary } from '../Components/Cart/CartOrderSummary'
  
  export const Cart = () => {
    const {items}= useSelector((store)=>store.cart);
    const [address,setAddress]= useState(false);
    const [checkout,setCheckout]= useState("");

    return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({items.length} items)
          </Heading>
        {address ? <AddressItem setCheckout= {setCheckout} setAddress={setAddress} /> : <Stack spacing="6">
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>}
        </Stack>
  
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary setAddress={setAddress} address={address} checkout={checkout} />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link as={ReachLink} color={mode('blue.500', 'blue.200')} to="/" >Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  )
}