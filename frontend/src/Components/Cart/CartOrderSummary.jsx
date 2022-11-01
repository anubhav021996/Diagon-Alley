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
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { addItem } from '../../Redux/Cart/actionCart';
  
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
  
  export const CartOrderSummary = ({setAddress,address,checkout}) => {
    const Dispatch= useDispatch();
    const Navigate= useNavigate();
    const {cart:{items,product_id,id},auth:{token}}= useSelector((store)=>store);
    const [total,setTotal]= React.useState();

    useEffect(()=>{
      let t=0;
      items.map((e)=>(
        t+= e.count*e.price
    ));
      setTotal(t);
    },[items]);

    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
  
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
      });
    };
    
    const handleCheckout = async () => {
      const res = await loadRazorpay();
      if (!res) {
        alert("Load failed");
      }
  
      const data = await axios
        .post(`${process.env.REACT_APP_BASE_URL}/orders/razorpay`, {
          amount: total+(total*0.18)-(total*0.10),
        })
        .then((res) => res.data);
  
      const options = {
        key: process.env.REACT_APP_RAZORPAY_ID,
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: "Diagon Alley",
        description: "Thanks for Shopping at Diagon Alley",
        image: "./logo.png",
  
        handler: async function (response) {
          await axios
            .get(
              `${process.env.REACT_APP_BASE_URL}/orders`,{ headers: {
                Authorization: 'Bearer ' + token 
              }})
            .then((res) => {
              axios
            .patch(
              `${process.env.REACT_APP_BASE_URL}/orders/${res.data._id}`,{product_id:product_id},{ headers: {
                Authorization: 'Bearer ' + token 
              }})
            .then((res) => {

            });
            });
            
            axios.patch(`${process.env.REACT_APP_BASE_URL}/cart/${id}`,{product_id:[]},{ headers: {
              Authorization: 'Bearer ' + token 
            }}).then((res)=>{
              axios.get(`${process.env.REACT_APP_BASE_URL}/cart`,{ headers: {
                Authorization: 'Bearer ' + token 
              }}).then((res)=>{
                Dispatch(addItem(res.data.product_id));
              })
            })

          // Navigate(`/order-success/${response.razorpay_order_id}`);
          Navigate("/paymentSuccess",{state:{id:response.razorpay_order_id}});
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const paymentObj = new window.Razorpay(options);
      paymentObj.open();
    };

    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Order Summary</Heading>
  
        <Stack spacing="6">
          <OrderSummaryItem label="Subtotal" value={formatPrice(total,"INR")} />
          <OrderSummaryItem label="Tax" value={formatPrice(total*0.18,"INR")} />
          <OrderSummaryItem label="Discount">-{formatPrice(total*0.10,"INR")}</OrderSummaryItem>
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
              {formatPrice(total+(total*0.18)-(total*0.10),"INR")}
            </Text>
          </Flex>
        </Stack>
        {checkout ? <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={handleCheckout} >
          Checkout
        </Button> : <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />} disabled={!items.length || address} onClick={()=>setAddress(true)}>
          Proceed to Checkout
        </Button>}
      </Stack>
    )
  }