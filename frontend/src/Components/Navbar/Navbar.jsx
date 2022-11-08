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

const navItems= [{name: "Goblet of Products", img: "https://res.cloudinary.com/dyocvbqbf/image/upload/v1667925047/Manuals/HD-wallpaper-harry-potter-harry-potter-and-the-goblet-of-fire_copy_bunsjf.jpg"},
{name: "Ollivander's Wands", img: "https://res.cloudinary.com/dyocvbqbf/image/upload/v1667925055/Manuals/ollivanders_copy_llgpps.jpg"},
{name: "Weasleys' Wheezes", img: "https://res.cloudinary.com/dyocvbqbf/image/upload/v1667925055/Manuals/20160804-DSC_0695-1536x1024_copy_uj9b6i.jpg"},
{name: "Sweet Trolley", img: "https://res.cloudinary.com/dyocvbqbf/image/upload/v1667925046/Manuals/855edda8-bbf4-45e9-bb6f-116e24c1bc5f-resize-950x633_dfnxdm.webp"},]

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