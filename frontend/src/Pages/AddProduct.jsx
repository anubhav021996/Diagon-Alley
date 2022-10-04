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
    Textarea,
    Select
  } from '@chakra-ui/react';
import { useState } from 'react';

export const AddProduct= () => {
    const [productData,setProductData]= useState({
        title: "",
        description: "",
        image: "",
        price: "",
        quantity: "",
        category: ""
    });

    const handleChange= (e) =>{
        const {name,value}= e.target;
        setProductData({...productData, [name]:value});
    }

    const handleSubmit= () => {
        console.log(productData);
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
              Add Product
            </Heading>
            <FormControl isRequired>
              <FormLabel>Product Title</FormLabel>
              <Input type="text" name="title" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Product Description</FormLabel>
              <Textarea name="description" onChange={handleChange} /> 
            </FormControl>
            <FormControl isRequired >
              <FormLabel>Product Image</FormLabel>
              <Input type="file" name="image" onChange={handleChange} />
            </FormControl>
              <Stack>
              <HStack>
              <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input type="number" name="price" onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input type="text" name="quantity" onChange={handleChange} />
            </FormControl>
            </HStack>
            </Stack>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select placeholder='Select category' name="category" onChange={handleChange}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
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