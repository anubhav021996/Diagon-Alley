import {
    Button,
    Flex,
    Heading,
    Link,
    Skeleton,
    Stack,
    Text,
    useColorModeValue as mode,
    useToast,
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
  
  export const CartOrderSummary = ({setAddress,address,checkout,close,editCart}) => {
    const Dispatch= useDispatch();
    const Navigate= useNavigate();
    const {cart:{items,product_id,id},auth:{token}}= useSelector((store)=>store);
    const [total,setTotal]= React.useState();
    const [loading,setLoading]= React.useState(false);
    const toast= useToast();

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

    const handleCheckout= () => {
      for(let i=0;i<items.length;i++){
        if(items[i].count>items[i].quantity) return toast({
          title: `Sorry! we only have stock of ${items[i].quantity} nos for ${items[i].title}.Please reduce the quantity to checkout.`,
          status: "info",
          position: "top",
          isClosable: true,
        })
      }
      setAddress(true);
    }
    
    const handlePayment = async () => {
      setLoading(true);
      const res = await loadRazorpay();
      if (!res) {
        alert("Load failed");
      }
  
      const data = await axios
        .post(`${process.env.REACT_APP_BASE_URL}/orders/razorpay`, {
          amount: Math.round(total+(total*0.18)-(total*0.10)),
        })
        .then((res) => res.data);
        close();
  
      const options = {
        key: process.env.REACT_APP_RAZORPAY_ID,
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: "Diagon Alley",
        description: "Thanks for Shopping at Diagon Alley",
        image: "./logo.png",
  
        handler: async function (response) {
          await axios.post(
            `${process.env.REACT_APP_BASE_URL}/orders`,{
              product_id:product_id, 
              address: checkout,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount:Math.round(total+(total*0.18)-(total*0.10)),
            },{ headers: {
                Authorization: 'Bearer ' + token 
              }})
              .then((res) => {
                // console.log(res);
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
        <OrderSummaryItem label="Subtotal"><Skeleton isLoaded={!editCart}>{formatPrice(total,"INR")}</Skeleton></OrderSummaryItem>
        <OrderSummaryItem label="Tax"><Skeleton isLoaded={!editCart}>{formatPrice(total*0.18,"INR")}</Skeleton></OrderSummaryItem>
        <OrderSummaryItem label="Discount"><Skeleton isLoaded={!editCart}>-{formatPrice(total*0.10,"INR")}</Skeleton></OrderSummaryItem>
          <OrderSummaryItem label="Shipping Charges">
            <Link href="#" textDecor="underline">
              Free Shipping
            </Link>
          </OrderSummaryItem>
          <OrderSummaryItem label="Round-off"><Skeleton isLoaded={!editCart}>{formatPrice(total+(total*0.18)-(total*0.10)-Math.round(total+(total*0.18)-(total*0.10)),"INR")}</Skeleton></OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
            <Skeleton isLoaded={!editCart}>
              {formatPrice(Math.round(total+(total*0.18)-(total*0.10)),"INR")}
              </Skeleton>
            </Text>
          </Flex>
        </Stack>
        {checkout ? <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />} disabled={loading} onClick={handlePayment} >
          Proceed to Payment
        </Button> : <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={!address && <FaArrowRight />} disabled={!items.length || address || editCart} onClick={handleCheckout}>
          {address ? "Please select delivery address" : "Proceed to Checkout"}
        </Button>}
      </Stack>
    )
  }