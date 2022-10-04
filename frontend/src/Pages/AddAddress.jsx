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
  } from '@chakra-ui/react';
import { useState } from 'react';

export const AddAddress= () => {
    const [address,setAddress]= useState({
        addLine1: "",
        addLine2: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    });

    const handleChange= (e) =>{
        const {name,value}= e.target;
        setAddress({...address, [name]:value});
    }

    const handleSubmit= () => {
        let finalAddress= `${address.addLine1},${address.addLine2},${address.city},${address.state},${address.pincode},${address.phone}`;
        console.log(finalAddress);
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
              Add Address
            </Heading>
            <FormControl isRequired>
              <FormLabel>Address Line 1</FormLabel>
              <Input type="text" name="addLine1" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address Line 2</FormLabel>
              <Input type="text" name="addLine2" onChange={handleChange} /> 
            </FormControl>
              <Stack>
              <HStack>
              <FormControl isRequired>
              <FormLabel>City/District</FormLabel>
              <Input type="text" name="city" onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Input type="text" name="state" onChange={handleChange} />
            </FormControl>
            </HStack>
            </Stack>
            <Stack>
              <HStack>
              <FormControl isRequired>
              <FormLabel>Pincode</FormLabel>
              <Input type="number" name="pincode" onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input type="number" name="phone" onChange={handleChange} />
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