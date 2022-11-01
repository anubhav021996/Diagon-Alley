import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Seller= () => {
    const [sellerData,setSellerData]= useState({
        businessName: "",
        gstNumber: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
        bankName: "",
        addLine1: "",
        addLine2: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    });

    const {token}= useSelector((store)=>store.auth);
    const toast= useToast();
    const Navigate= useNavigate();

    const handleChange= (e) =>{
        const {name,value}= e.target;
        setSellerData({...sellerData, [name]:value});
    }

    const handleSubmit= () => {
        let address= `${sellerData.addLine1},${sellerData.addLine2},${sellerData.city},${sellerData.state},${sellerData.pincode},${sellerData.phone}`;
        sellerData.businessAddress= address;
        delete sellerData.addLine1;
        delete sellerData.addLine2;
        delete sellerData.city;
        delete sellerData.state;
        delete sellerData.pincode;
        delete sellerData.phone;
        axios.patch(`${process.env.REACT_APP_BASE_URL}/user/seller`,sellerData,{ headers: {
          Authorization: 'Bearer ' + token 
        }}).then((res)=>{
          Navigate("/");
      })
      .catch((e)=>{
        e.response.data.errors.map((el)=>(
          toast({
            title: el.msg,
            status: "error",
            position: "top",
            isClosable: true,
          })
        ))
      })
    }

    return (
        <Flex
        //   minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={800}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Become a Seller
            </Heading>
            <FormControl isRequired>
              <FormLabel>Business Name</FormLabel>
              <Input type="text" name="businessName" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>GST Number</FormLabel>
              <Input type="text" name="gstNumber" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired >
              <FormLabel>Business Address</FormLabel>
              <Stack>
              <Input type="text" placeholder="Address Line 1"
            _placeholder={{ color: 'gray.500' }} name="addLine1" onChange={handleChange} />
              <Input type="text" placeholder="Address Line 2"
            _placeholder={{ color: 'gray.500' }} name="addLine2" onChange={handleChange} />
            <HStack>
              <Input type="text" placeholder="City/District"
            _placeholder={{ color: 'gray.500' }} name="city" onChange={handleChange} />
              <Input type="text" placeholder="State"
            _placeholder={{ color: 'gray.500' }} name="state" onChange={handleChange} />
            </HStack>
            <HStack>
            <Input type="number" placeholder="Pincode"
            _placeholder={{ color: 'gray.500' }} name="pincode" onChange={handleChange} />
            <Input type="number" placeholder="Phone number" 
            _placeholder={{ color: 'gray.500' }} name="phone" onChange={handleChange} />
            </HStack>
            </Stack>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Account Details</FormLabel>
              <Stack>
              <HStack>
              <Input type="number" placeholder="Account number"
            _placeholder={{ color: 'gray.500' }} name="accountNumber" onChange={handleChange} />
              <Input type="text" placeholder="Ifsc code"
            _placeholder={{ color: 'gray.500' }} name="ifscCode" onChange={handleChange} />
            </HStack>
            <HStack>
            <Input type="text" placeholder="Account holder name"
            _placeholder={{ color: 'gray.500' }} name="accountHolderName" onChange={handleChange} />
            <Input type="text" placeholder="Bank name"
            _placeholder={{ color: 'gray.500' }} name="bankName" onChange={handleChange} />
            </HStack>
            </Stack>
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={handleSubmit} >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      );
}