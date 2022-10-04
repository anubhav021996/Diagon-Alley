import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    InputRightElement,
    InputGroup,
    useToast,
  } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToken, addUser } from '../Redux/Login/actionLogin';
  
  export const ResetPassword= () => {
    const toast= useToast();
    const {state}= useLocation();
    const [password,setPassword]= useState("");
    const [showPassword, setShowPassword] = useState(false);
    const Dispatch= useDispatch();
    const Navigate= useNavigate();
    const {token}= useSelector((store)=>store.auth);

    useEffect(()=>{
      if(token) Navigate("/");
      if(!state) Navigate("/login");
    },[token]);

    const handleSubmit= () => {
        axios.patch(`${process.env.REACT_APP_BASE_URL}/user/reset`,{password:password},{ headers: {
            Authorization: 'Bearer ' + state.token 
          }}).then((res)=>{
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
        // minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                value={state?.email} disabled
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)}/>
            <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
                </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }} onClick={handleSubmit} disabled={!password} >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }