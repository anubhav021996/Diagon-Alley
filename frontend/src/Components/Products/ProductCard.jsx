import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Image,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../../Redux/Cart/actionCart';
import { PriceTag } from './PriceTag'
  
  export const ProductCard = ({product, loading}) => {
    const Dispatch= useDispatch();
    const Navigate= useNavigate();
    const [addCart,setAddCart]= useState(false);
    const toast= useToast();
    const { title, image, price, user_id:{businessName}, quantity, _id } = product;
    const {cart:{product_id,id,obj},auth:{token}}= useSelector((store)=>store);

    const addToCart= (p_id) => {
      if(!token) return Navigate("/login");
      setAddCart(true);
      product_id.push(p_id);
      axios.patch(`${process.env.REACT_APP_BASE_URL}/cart/${id}`,{product_id:product_id},{ headers: {
        Authorization: 'Bearer ' + token 
      }}).then((res)=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/cart`,{ headers: {
          Authorization: 'Bearer ' + token 
        }}).then((res)=>{
          Dispatch(addItem(res.data.product_id));
        })
        toast({
          title: "Item Added to Cart",
          status: "success",
          position: "top",
          isClosable: true,
        });
        setAddCart(false);
      })
    }
    
    return (
      <Skeleton isLoaded={!loading}>
      <Stack p={4} backgroundColor="#e6e8e8" borderRadius="2xl" spacing={useBreakpointValue({ base: '4', md: '5' })} boxShadow= "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={image}
              alt={title}
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
              onClick={()=>{
                Navigate(`/productDetails`,{state:{id:_id}});
              }}
              cursor="pointer"
            />
          </AspectRatio>
        </Box>
        <Stack>
          <Stack spacing="3">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}
            onClick={()=>{
              Navigate(`/productDetails`,{state:{id:_id}});
            }}
            cursor="pointer" align={"left"}
            overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}
            >
              {title}
            </Text>
            <PriceTag price={price} currency="INR" />
          </Stack>
          <HStack>
            <Text overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} align={"left"} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              <b>Seller:</b> {businessName}
            </Text>
          </HStack>
        </Stack>
        <Stack align="center">
          <Button colorScheme="blue" width="full" disabled={!quantity || _id in obj || addCart} onClick={()=>addToCart(_id)}>
            {!quantity ? "Out of Stock" : _id in obj ? "Added to Cart" : "Add to cart"}
          </Button>
        </Stack>
      </Stack>
      </Skeleton>
    )
  }