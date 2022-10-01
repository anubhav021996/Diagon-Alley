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
    Box
  } from '@chakra-ui/react';
import { useState } from 'react';
import axios from "axios";

export const Signup= () => {
    const[text,setText]= useState("");
    const[sentOtp,setSentOtp]= useState(false);
    const[otpRec,setOtpRec]= useState(false);
    const[otp,setOtp]= useState("");

    const sendOtp= () => {
        // axios.post("http://localhost:2548/email",{email:text,type:"register"}).then((res)=>{
        //     console.log(res);
        // })
        // .catch((e)=>{
        //     console.log(e);
        // })
        setSentOtp(true);
        setOtpRec(true);
    }

    const verifyOtp= () => {
        console.log(otp);
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
                type="email" value={text} disabled={sentOtp} onChange={(e)=>setText(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={sendOtp} disabled={sentOtp} >
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
                 onClick={verifyOtp} >
                Verify OTP
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                 >
                Resend OTP
              </Button>
            </Box>
            </Stack>}
          </Stack>
        </Flex>
      );
}