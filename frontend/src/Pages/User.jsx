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
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useLocation, Link as ReachLink, useNavigate } from 'react-router-dom';
  import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addToken, addUser } from '../Redux/Login/actionLogin';

export const User= () => {
  const {state}= useLocation();
  const Navigate= useNavigate();
  const Dispatch= useDispatch();
  const toast= useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isUpload, setIsUpload]= useState(false);
  const [formData,setFormData]= useState({
    firstName: "",
    lastName: "",
    password: "",
    avatar: ""
  });

  const {token}= useSelector((store)=>store.auth);

    useEffect(()=>{
      if(token) Navigate("/");
      if(!state) Navigate("/login");
    },[token]);

  const handleChange= (e) => {
      const {value, name, type,files}= e.target;
      if(type!=="file"){
        setFormData({...formData,[name]:value});
      }
      else{
        setIsUpload(true);
        const picData = new FormData();
        picData.append("file", files[0]);
        picData.append("upload_preset", "diagonAlley");
    axios.post(process.env.REACT_APP_IMAGE_URL, picData)
      .then((res) => {
        setFormData({...formData,[name]:res.data.url});
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
  }

  const handleSubmit= () => {
      axios.post(`${process.env.REACT_APP_BASE_URL}/user`,formData,{ headers: {
        Authorization: 'Bearer ' + state.token 
      }}).then((res)=>{
        Dispatch(addToken(res.data.token));
        Dispatch(addUser(res.data.user));
        localStorage.setItem("token",JSON.stringify(res.data.token));
      })
      .catch((e)=>{
        if(e.response.data.errors){
          let err= e.response.data.errors;
          err.map(({msg})=>{
            toast({
              title: msg,
              status: "error",
              position: "top",
              isClosable: true,
            });
          })
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
              <FormLabel>Email</FormLabel>
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
              <Input type="file" name="avatar" onChange={handleChange} disabled={isUpload} />
              {isUpload && <Progress size='xs' isIndeterminate />}
            </FormControl>
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