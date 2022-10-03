import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    PinInput,
    PinInputField,
    Box,
    useToast
  } from '@chakra-ui/react';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const ForgetPassword= () => {
    const Navigate= useNavigate();
    const[text,setText]= useState("");
    const[reqOtp,setReqOtp]= useState(false);
    const[sentOtp,setSentOtp]= useState(false);
    const[otpRec,setOtpRec]= useState(false);
    const[otp,setOtp]= useState("");
    const toast= useToast();

    const sendOtp= () => {
      setReqOtp(true);
        axios.post("http://localhost:2548/email",{email:text,type:"reset"}).then((res)=>{
            setOtpRec(true);
            toast({
              title: res.data,
              status: 'success',
              position: "top",
              isClosable: true,
            })
        })
        .catch((e)=>{
            setReqOtp(false);
            toast({
              title: e.response.data,
              status: "error",
              position: "top",
              isClosable: true,
            })
        })
    }

    const verifyOtp= () => {
      setSentOtp(true);
        axios.post("http://localhost:2548/otp",{email:text,otp:+otp}).then((res)=>{
        Navigate("/resetPassword",{state:{token:res.data,email:text}});
        })
        .catch((e)=>{
            setSentOtp(false);
            toast({
              title: e.response.data,
              status: "error",
              position: "top",
              isClosable: true,
            })
        })
    }

    return (
        <Flex
          minH={'80vh'}
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
                Forgot your password?
            </Heading>
            <Text
              fontSize={{ base: 'sm', sm: 'md' }}
              color={useColorModeValue('gray.800', 'gray.400')}>
              You&apos;ll get an email with a otp
            </Text>
            <FormControl id="email">
              <Input
                placeholder="Please enter your email"
                _placeholder={{ color: 'gray.500' }}
                type="email" value={text} disabled={reqOtp} onChange={(e)=>setText(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={sendOtp} disabled={reqOtp || !text} >
                Request OTP
              </Button>
            </Stack>
            {otpRec && <Stack>
            <Box>
                <PinInput otp >
                    <PinInputField onChange={(e)=>setOtp(otp+e.target.value)}/>
                    <PinInputField onChange={(e)=>setOtp(otp+e.target.value)}/>
                    <PinInputField onChange={(e)=>setOtp(otp+e.target.value)}/>
                    <PinInputField onChange={(e)=>setOtp(otp+e.target.value)}/>
                </PinInput>
            </Box>
            <Box display="flex" justifyContent="space-evenly">
            <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                 onClick={verifyOtp} disabled={sentOtp} >
                Verify OTP
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={sendOtp} disabled={sentOtp}
                 >
                Resend OTP
              </Button>
            </Box>
            </Stack>}
          </Stack>
        </Flex>
      );
}