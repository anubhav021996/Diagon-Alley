import { Box, Button, FormControl, Heading, Input, Link, Modal, ModalCloseButton, ModalContent, ModalOverlay, PinInput, PinInputField, Stack, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgetPasswordVerification= () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const Navigate= useNavigate();
    const[text,setText]= useState("");
    const[reqOtp,setReqOtp]= useState(false);
    const[sentOtp,setSentOtp]= useState(false);
    const[otpRec,setOtpRec]= useState(false);
    const[time,setTime]= useState(5);
    const[resend,setResend]= useState(false);
    const[otp,setOtp]= useState({
      otp1:"",
      otp2:"",
      otp3:"",
      otp4:"",
    });
    const toast= useToast();

    const handleOpen= () => {
        setText("");
        setReqOtp(false);
        setSentOtp(false);
        setOtpRec(false);
        setTime(5);
        setResend(false);
        setOtp({
            otp1:"",
            otp2:"",
            otp3:"",
            otp4:"",
        })
        onOpen();
    }

    const handleChange= (e) => {
      const {value,name}= e.target;
      setOtp({...otp,[name]:value});
  }

    const sendOtp= () => {
      setReqOtp(true);
      setResend(false);
      setTime(5);
        axios.post(`${process.env.REACT_APP_BASE_URL}/email`,{email:text,type:"reset"}).then((res)=>{
            setOtpRec(true);
            toast({
              title: res.data,
              status: 'success',
              position: "top",
              isClosable: true,
            })

            let id= setInterval(()=>{
              setTime((t)=>{
                if(t==1){
                  clearInterval(id);
                  setResend(true);
                } 
                return t-1;
              });
            },1000);

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
            Navigate("/resetPassword",{state:{token:res.data,email:text}});
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
      <>
        <Link onClick={handleOpen} color={'blue.400'} fontSize={'md'} >
            Forgot password?
        </Link>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent 
          display="flex" align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')} p={6} >
          <ModalCloseButton />
          <Stack
          align={'center'}
            spacing={4}
            w={'full'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
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
                placeholder="Please enter a valid email"
                _placeholder={{ color: 'gray.500' }}
                type="email" value={text} disabled={reqOtp} onChange={(e)=>setText(e.target.value)}
              />
            </FormControl>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={sendOtp} disabled={reqOtp || !text} 
                minW={"100%"}
                >
                Request OTP
              </Button>
            {otpRec && <Stack>
            <Box>
                <PinInput otp minW={"100%"} >
                    <PinInputField name="otp1" onChange={handleChange}/>
                    <PinInputField name="otp2" onChange={handleChange}/>
                    <PinInputField name="otp3" onChange={handleChange}/>
                    <PinInputField name="otp4" onChange={handleChange}/>
                </PinInput>
            </Box>
            <Box display="flex" justifyContent="space-evenly" minW={"xl"} pt={2} >
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={sendOtp} disabled={sentOtp || !resend}
                 >
                {resend ? "Resend OTP" : `Resend Otp in ${time} sec`}
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                 onClick={verifyOtp} disabled={sentOtp} >
                Verify OTP
              </Button>
            </Box>
            </Stack>}
          </Stack>
          </ModalContent>
        </Modal>
      </>
    )
  }