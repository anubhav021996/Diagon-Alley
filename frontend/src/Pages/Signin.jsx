import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
    Center,
    Text,
    useToast
  } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
  import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
  import {Link as ReachLink, useNavigate} from "react-router-dom";
import { addToken, addUser } from '../Redux/Login/actionLogin';

export const Signin= () => {
  const toast= useToast();
  const Navigate= useNavigate();
  const Dispatch= useDispatch();
  const {token}= useSelector((store)=>store.auth);
  const [loginData, setLoginData]= useState({
    email: "",
    password: ""
  });

  useEffect(()=>{
    if(token) Navigate("/");
  },[token]);
  

  const handleChange= (e) => {
      const{value,name}= e.target;
      setLoginData({...loginData,[name]:value});
  }

  const handleSubmit= () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/login`,loginData).then((res)=>{
      Dispatch(addToken(res.data.token));
      Dispatch(addUser(res.data.user));
      localStorage.setItem("token",JSON.stringify(res.data.token));
    })
    .catch((e)=>{
      if(e.response.data.errors){
        let err= e.response.data.errors;
        err.map(({msg})=>{
          toast({
            title: msg,
            status: "error",
            position: "top",
            isClosable: true,
          });
        })
      }
      else{
        toast({
          title: e.response.data,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    })
  }

    return (
        <Flex
        //  minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" onChange={handleChange} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" onChange={handleChange} />
                </FormControl>
                
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link as={ReachLink} to="/forgetPassword" color={'blue.400'}>Forgot password?</Link>
                  </Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }} onClick={handleSubmit}
                    >
                    Sign in
                  </Button>
                  <Button
                    w={'full'}
                    maxW={'md'}
                    variant={'outline'}
                    as={ReachLink}
                    leftIcon={<FcGoogle />}
                    // onClick={()=>window.location.href="http://localhost:2548/auth/google"}
                  >
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>
                </Stack>
                <Link as={ReachLink} to="/signup" color={'blue.400'} fontSize={'md'} >
                Create a new account
              </Link>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
}