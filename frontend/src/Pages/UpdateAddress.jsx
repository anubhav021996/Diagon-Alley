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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const UpdateAddress= () => {
  const toast= useToast();
    const [addressForm,setAddressForm]= useState({
        addLine1: "",
        addLine2: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    });
    const {token}= useSelector((store)=>store.auth);
    const [address,setAddress]= useState([]);
    const {state}= useLocation();
    const Navigate= useNavigate();
    
    useEffect(()=>{
      if(!state) return Navigate("/address");
        axios.get(`${process.env.REACT_APP_BASE_URL}/address`,{ headers: {
            Authorization: 'Bearer ' + token 
          }}).then((res)=>{
            let oldAddress= res.data.address[state.index].split(",");
            setAddressForm({
                addLine1: oldAddress[0],
                addLine2: oldAddress[1],
                city: oldAddress[2],
                state: oldAddress[3],
                pincode: oldAddress[4],
                phone: oldAddress[5]
            })
            setAddress(res.data)
          })
          .catch((e)=>{
            console.log(e);
          })
    },[token]);

    const handleChange= (e) =>{
        const {name,value}= e.target;
        setAddressForm({...addressForm, [name]:value});
    }

    const handleSubmit= () => {
      if(!addressForm.addLine1 || !addressForm.addLine2 || !addressForm.city || !addressForm.state || !addressForm.pincode || !addressForm.phone){
        return toast({
          title: "All fields are required",
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
        let finalAddress= ` ${addressForm.addLine1}, ${addressForm.addLine2}, ${addressForm.city}, ${addressForm.state}, ${addressForm.pincode}, ${addressForm.phone}`;
        let addArr= address.address;
        addArr[state.index]=finalAddress;
        axios.patch(`${process.env.REACT_APP_BASE_URL}/address/${address._id}`,{address:addArr},{ headers: {
          Authorization: 'Bearer ' + token 
        }}).then((res)=>{
          Navigate("/address");
        })
        .catch((e)=>{
          console.log(e);
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
              Update Address
            </Heading>
            <FormControl isRequired>
              <FormLabel>Address Line 1</FormLabel>
              <Input type="text" name="addLine1" value={addressForm.addLine1} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address Line 2</FormLabel>
              <Input type="text" name="addLine2" value={addressForm.addLine2} onChange={handleChange} /> 
            </FormControl>
              <Stack>
              <HStack>
              <FormControl isRequired>
              <FormLabel>City/District</FormLabel>
              <Input type="text" name="city" value={addressForm.city} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Input type="text" name="state" value={addressForm.state} onChange={handleChange} />
            </FormControl>
            </HStack>
            </Stack>
            <Stack>
              <HStack>
              <FormControl isRequired>
              <FormLabel>Pincode</FormLabel>
              <Input type="number" name="pincode" value={addressForm.pincode} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input type="number" name="phone" value={addressForm.phone} onChange={handleChange} />
            </FormControl>
            </HStack>
            </Stack>
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