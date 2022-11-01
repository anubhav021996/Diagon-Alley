import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Image,
    Link,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../../Redux/Cart/actionCart';
import { PriceTag } from './PriceTag'
  
  export const ProductCard = ({product}) => {
    const Dispatch= useDispatch();
    const Navigate= useNavigate();
    const toast= useToast();
    const { title, image, price, user_id:{businessName}, quantity, _id } = product;
    const {cart:{product_id,id,obj},auth:{token}}= useSelector((store)=>store);

    const addToCart= (p_id) => {
      if(!token) return Navigate("/login");
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
      })
    }
    
    return (
      <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={image}
              alt={title}
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
            />
          </AspectRatio>
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
              {title}
            </Text>
            <PriceTag price={price} currency="INR" />
          </Stack>
          <HStack>
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {businessName}
            </Text>
          </HStack>
        </Stack>
        <Stack align="center">
          <Button colorScheme="blue" width="full" disabled={!quantity || _id in obj} onClick={()=>addToCart(_id)}>
            {!quantity ? "Out of Stock" : _id in obj ? "Item Added to Cart" : "Add to cart"}
          </Button>
          <Link
            textDecoration="underline"
            fontWeight="medium"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Quick shop
          </Link>
        </Stack>
      </Stack>
    )
  }