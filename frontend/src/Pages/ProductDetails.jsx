import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    useToast,
    Skeleton,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatPrice } from '../Components/Products/PriceTag';
import { addItem } from '../Redux/Cart/actionCart';
  
  export const ProductDetails= () => {
    const [product,setProduct]= useState([]);
    const [addCart,setAddCart]= useState(false);
    const [loading, setLoading]= useState(false);
    const {cart:{product_id,id,obj},auth:{token}}= useSelector((store)=>store);
    const {state}= useLocation();
    const Navigate= useNavigate();
    const Dispatch= useDispatch();
    const toast= useToast();

    useEffect(()=>{
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/product/${state.id}`)
          .then((res)=>{
            setProduct(res.data);
            setLoading(false);
          });
      },[]);

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
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
          <Skeleton isLoaded={!loading} >
            <Image
              rounded={'md'}
              alt={'product image'}
              src={product.image}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
            </Skeleton>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <VStack as={'header'} spacing={2}>
            <Skeleton isLoaded={!loading} >
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {product.title}
              </Heading>
              </Skeleton>
              <Skeleton isLoaded={!loading} >
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                {formatPrice(product.price,"INR")}
              </Text>
              </Skeleton>
            </VStack>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
                <Text fontSize={'lg'}>
                  {product.description}
                </Text>

              <Box>
                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                    Category:
                    </Text>{' '}
                    {product.category}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                    Seller:
                    </Text>{' '}
                    {product.user_id?.businessName}
                  </ListItem>
                </List>
              </Box>
            </Stack>
  
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              disabled={!product.quantity || product._id in obj || addCart} onClick={()=>addToCart(product._id)}
              >
              {!product.quantity ? "Out of Stock" : product._id in obj ? "Item Added to Cart" : "Add to cart"}
            </Button>
  
            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }