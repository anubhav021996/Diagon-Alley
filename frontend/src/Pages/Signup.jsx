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

export const Signup= () => {
    const Navigate= useNavigate();
    const[text,setText]= useState("");
    const[reqOtp,setReqOtp]= useState(false);
    const[sentOtp,setSentOtp]= useState(false);
    const[otpRec,setOtpRec]= useState(false);
    const[otp,setOtp]= useState({
      otp1:"",
      otp2:"",
      otp3:"",
      otp4:"",
    });
    const toast= useToast();

    const handleChange= (e) => {
      const {value,name}= e.target;
      setOtp({...otp,[name]:value});
  }

    const sendOtp= () => {
      setReqOtp(true);
        axios.post(`${process.env.REACT_APP_BASE_URL}/email`,{email:text,type:"register"}).then((res)=>{
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
        })
    }

    const verifyOtp= () => {
      let finalOtp= otp.otp1+otp.otp2+otp.otp3+otp.otp4;
      setSentOtp(true);
        axios.post(`${process.env.REACT_APP_BASE_URL}/otp`,{email:text,otp:+finalOtp}).then((res)=>{
        Navigate("/user",{state:{token:res.data,email:text}});
        })
        .catch((e)=>{
            setSentOtp(false);
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
              Email Verification
            </Heading>
            <Text
              fontSize={{ base: 'sm', sm: 'md' }}
              color={useColorModeValue('gray.800', 'gray.400')}>
              You&apos;ll get an email with a otp
            </Text>
            <FormControl id="email">
              <Input
                placeholder="Please enter a valid email"
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
                    <PinInputField name="otp1" onChange={handleChange}/>
                    <PinInputField name="otp2" onChange={handleChange}/>
                    <PinInputField name="otp3" onChange={handleChange}/>
                    <PinInputField name="otp4" onChange={handleChange}/>
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