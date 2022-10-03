import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    Progress
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useLocation, Link as ReachLink, useNavigate } from 'react-router-dom';
  import axios from "axios";

export const User= () => {
  const {state}= useLocation();
  const Navigate= useNavigate();
  const toast= useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isUpload, setIsUpload]= useState(false);
  const [formData,setFormData]= useState({
    firstName: "",
    lastName: "",
    password: "",
    avatar: ""
  });

  // if(!state) Navigate("/login");

  const handleChange= (e) => {
      const {value, name, type,files}= e.target;
      let fValue;
      console.log(type);
      if(type!=="file"){
        fValue= value;
      }
      else{
        setIsUpload(true);
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "diagonAlley");
    axios.post("https://api.cloudinary.com/v1_1/dyocvbqbf/image/upload", formData)
      .then((res) => {
        fValue= res.data.url;
      })
      .catch((e)=>{
        toast({
          title: e.response.data.error.message,
          status: "error",
          position: "top",
          isClosable: true,
        });
      })
      .finally(()=>{
        setIsUpload(false);
      });
      }
      setFormData({...formData,[name]:fValue});
  }

  const handleSubmit= () => {
      console.log(formData);
  }

  return (
    <Flex
    //   minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name="firstName" onChange={handleChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" name="lastName" onChange={handleChange} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={state?.email} disabled />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" onChange={handleChange} />
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
            <FormControl id="photo" isRequired>
              <FormLabel>Profile Photo</FormLabel>
              <Input type="file" name="avatar" onChange={handleChange} />
            </FormControl>
            {isUpload && <Progress size='xs' isIndeterminate />}
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={handleSubmit} disabled={isUpload}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link as={ReachLink} to="/login" color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}