import {
    Box,
    SimpleGrid,
    Text,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatPrice } from '../Products/PriceTag';
import { OrderCard } from './OrderCard';

export const OrderSection= ({order}) => {
    const [product,setProduct]= useState([]);

    let obj={};
    useEffect(()=>{
        for(let i=0;i<order.product_id.length;i++){
            if(order.product_id[i]._id in obj) obj[order.product_id[i]._id].count++;
            else obj[order.product_id[i]._id]= {
                title: order.product_id[i].title,
                image: order.product_id[i].image,
                price: order.product_id[i].price,
                count: 1,
            }
        }
        let arr=[];
        for(let key in obj) arr.push(obj[key]);
        setProduct(arr);
    },[]);

    return (
        <Box p={5} boxShadow= "rgba(0, 0, 0, 0.35) 0px 5px 15px">
      <Text color={'gray.600'} fontSize={'l'} textAlign="left"><b>Order Id:</b> {order.orderId}</Text>
      <Text color={'gray.600'} fontSize={'l'} textAlign="left"><b>Order Date:</b> {order.createdAt.substring(0,10)}</Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mt={5}>
        {product.map((product,i) => (
          <OrderCard key={i} product={product} />
        ))}
      </SimpleGrid>
    <Text color={'gray.600'} fontSize={'l'} textAlign="left" mt={5} ><b>Payment Amount:</b> {formatPrice(order.amount,"INR")}</Text>
    <Text color={'gray.600'} fontSize={'l'} textAlign="left"><b>Payment Id:</b> {order.paymentId}</Text>
    <Text color={'gray.600'} fontSize={'l'} textAlign="left" mt={5} ><b>Delivery Address:</b> {order.address?.substring(0,order.address.length-20)}</Text>
  </Box>
    )
}