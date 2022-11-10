import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EmailVerification } from '../Components/EmailVerification';
import { ForgetPasswordVerification } from '../Components/ForgetPasswordVerification';
import { addToken, addUser } from '../Redux/Login/actionLogin';

export const Signin= () => {
  const toast= useToast();
  const Dispatch= useDispatch();
  const [loading,setLoading]= useState(false);
  const [verified,setVerified]= useState(false);
  const [loginData, setLoginData]= useState({
    email: "",
    password: ""
  });

  const handleChange= (e) => {
      const{value,name}= e.target;
      setLoginData({...loginData,[name]:value});
  }

  const handleSubmit= () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/login`,loginData).then((res)=>{
      Dispatch(addToken(res.data.token));
      Dispatch(addUser(res.data.user));
      localStorage.setItem("token",JSON.stringify(res.data.token));
      setLoading(false);
    })
    .catch((e)=>{
      if(e.response.data.errors){
        let err= e.response.data.errors;
        err.map(({msg})=>(
          toast({
            title: msg,
            status: "error",
            position: "top",
            isClosable: true,
          })
        ))
      }
      else{
        toast({
          title: e.response.data,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
      setLoading(false);
    })
  }

  const captchaChange= (e) => {
    e ? setVerified(true) : setVerified(false);
  }

    return (
        <Flex
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
                
                <Stack spacing={5}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <ForgetPasswordVerification />
                  </Stack>
                  <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY} onChange={captchaChange} />
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }} onClick={handleSubmit} disabled={loading || !verified}
                    >
                    Sign in
                  </Button>
                </Stack>
                <EmailVerification />
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
}