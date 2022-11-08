import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserIcon } from './UserIcon';
import { Login } from './Login';
import { addToken, addUser } from '../../Redux/Login/actionLogin';
import { useEffect } from 'react';
import axios from 'axios';
import { addId, addItem } from '../../Redux/Cart/actionCart';
import { CartModal } from '../Cart/CartModal';

const navItems= [{name: "Goblet of Products", img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5346ef1f-ab44-49ca-b69c-d15c1d1c2582/dc30899-c5fd1b9e-29bf-4f59-b446-49e03f078734.jpg/v1/fill/w_980,h_330,q_75,strp/banner_ollivanders_by_mariannehemmings_dc30899-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzMwIiwicGF0aCI6IlwvZlwvNTM0NmVmMWYtYWI0NC00OWNhLWI2OWMtZDE1YzFkMWMyNTgyXC9kYzMwODk5LWM1ZmQxYjllLTI5YmYtNGY1OS1iNDQ2LTQ5ZTAzZjA3ODczNC5qcGciLCJ3aWR0aCI6Ijw9OTgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.ARpkpoFaJ0raL4IxqPQkYzZ7ikG_i6Tao9Qmlg7rzkA"},
{name: "Ollivander's Wands", img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5346ef1f-ab44-49ca-b69c-d15c1d1c2582/dc30899-c5fd1b9e-29bf-4f59-b446-49e03f078734.jpg/v1/fill/w_980,h_330,q_75,strp/banner_ollivanders_by_mariannehemmings_dc30899-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzMwIiwicGF0aCI6IlwvZlwvNTM0NmVmMWYtYWI0NC00OWNhLWI2OWMtZDE1YzFkMWMyNTgyXC9kYzMwODk5LWM1ZmQxYjllLTI5YmYtNGY1OS1iNDQ2LTQ5ZTAzZjA3ODczNC5qcGciLCJ3aWR0aCI6Ijw9OTgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.ARpkpoFaJ0raL4IxqPQkYzZ7ikG_i6Tao9Qmlg7rzkA"},
{name: "Weasleys' Wheezes", img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5346ef1f-ab44-49ca-b69c-d15c1d1c2582/dc30899-c5fd1b9e-29bf-4f59-b446-49e03f078734.jpg/v1/fill/w_980,h_330,q_75,strp/banner_ollivanders_by_mariannehemmings_dc30899-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzMwIiwicGF0aCI6IlwvZlwvNTM0NmVmMWYtYWI0NC00OWNhLWI2OWMtZDE1YzFkMWMyNTgyXC9kYzMwODk5LWM1ZmQxYjllLTI5YmYtNGY1OS1iNDQ2LTQ5ZTAzZjA3ODczNC5qcGciLCJ3aWR0aCI6Ijw9OTgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.ARpkpoFaJ0raL4IxqPQkYzZ7ikG_i6Tao9Qmlg7rzkA"},
{name: "Sweet Trolley", img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5346ef1f-ab44-49ca-b69c-d15c1d1c2582/dc30899-c5fd1b9e-29bf-4f59-b446-49e03f078734.jpg/v1/fill/w_980,h_330,q_75,strp/banner_ollivanders_by_mariannehemmings_dc30899-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzMwIiwicGF0aCI6IlwvZlwvNTM0NmVmMWYtYWI0NC00OWNhLWI2OWMtZDE1YzFkMWMyNTgyXC9kYzMwODk5LWM1ZmQxYjllLTI5YmYtNGY1OS1iNDQ2LTQ5ZTAzZjA3ODczNC5qcGciLCJ3aWR0aCI6Ijw9OTgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.ARpkpoFaJ0raL4IxqPQkYzZ7ikG_i6Tao9Qmlg7rzkA"},]

export const Navbar= () => {
  const Dispatch= useDispatch();
  const {token}= useSelector((store)=>store.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate= useNavigate();

  const handleLogout= () => {
    Dispatch(addToken(null));
    Dispatch(addUser(null));
    Dispatch(addItem([]));
    Dispatch(addId(null));
    localStorage.removeItem("token");
  }

  useEffect(()=>{
    if(token){
      axios.get(`${process.env.REACT_APP_BASE_URL}/user`,{ headers: {
        Authorization: 'Bearer ' + token 
      }}).then((res)=>{
        Dispatch(addUser(res.data));
      })
      axios.get(`${process.env.REACT_APP_BASE_URL}/cart`,{ headers: {
        Authorization: 'Bearer ' + token 
      }}).then((res)=>{
        Dispatch(addId(res.data._id));
        Dispatch(addItem(res.data.product_id));
      })
    }
  },[token]);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={150} alignItems={'center'}>
            <Box onClick={()=>Navigate("/")} cursor="pointer">
            <Image src="./logo.png" h={50} alt="logo" width={"80%"} minW={{md:"200px"}} />
            </Box>
            <HStack
              as={'nav'}
              spacing={10}
              display={{ base: 'none', lg: 'flex' }}>
              {navItems.map((item) => (
              <Text key={item.name} 
              fontWeight={500}
              cursor={"pointer"}
              _hover={{
                color:"rgb(25,118,210)",
                borderBottom:"1px solid rgb(25,118,210)",
                pb:"2"
              }}
              onClick={()=>Navigate("/product",{state:{cat:item}})}
              >{item.name}
              </Text>))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <CartModal />
            <Box mr={{md: 5, lg:0}}>
            {token ? <UserIcon logout={handleLogout}/> : <Login login={()=> Navigate("/login")} />}
            </Box>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box p={4} display={{ lg: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {navItems.map((item) => (<Text key={item.name} fontWeight={500} onClick={()=>{
                Navigate("/product",{state:{cat:item}});
                onClose();
              }} >{item.name}</Text>))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}