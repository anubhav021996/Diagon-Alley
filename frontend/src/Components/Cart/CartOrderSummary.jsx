import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { FaArrowRight } from 'react-icons/fa'
  import { formatPrice } from '../Products/PriceTag'
  import { useSelector } from "react-redux";
import { useEffect } from 'react';
  
  const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = () => {
    const {items}= useSelector((store)=>store.cart);
    const [total,setTotal]= React.useState();

    useEffect(()=>{
      let t=0;
      items.map((e)=>(
        t+= e.count*e.price
    ));
      setTotal(t);
    },[items]);

    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Order Summary</Heading>
  
        <Stack spacing="6">
          <OrderSummaryItem label="Subtotal" value={formatPrice(total,"INR")} />
          <OrderSummaryItem label="Tax" value={formatPrice(total*0.18,"INR")} />
          <OrderSummaryItem label="Shipping Charges">
            <Link href="#" textDecor="underline">
              Free Shipping
            </Link>
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {formatPrice(total+(total*0.18),"INR")}
            </Text>
          </Flex>
        </Stack>
        <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
          Checkout
        </Button>
      </Stack>
    )
  }