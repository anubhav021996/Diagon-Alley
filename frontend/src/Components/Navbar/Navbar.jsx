import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { PopOver } from './PopOver';

import styles from "./Cart.module.css";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserIcon } from './UserIcon';
import { Login } from './Login';
import { addToken, addUser } from '../../Redux/Login/actionLogin';
import { useEffect } from 'react';
import axios from 'axios';
import { addId, addItem } from '../../Redux/Cart/actionCart';

const navItems = ['Departments', 'Collections', 'Characters'];

export const Navbar= () => {
  const Dispatch= useDispatch();
  const {auth:{token},cart}= useSelector((store)=>store);
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
    const token= JSON.parse(localStorage.getItem("token"));
    if(token){
      Dispatch(addToken(token));
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
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={300} alignItems={'center'}>
            <Box onClick={()=>Navigate("/")} cursor="pointer">
            <Image src="./logo.png" h={50} alt="logo" />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {navItems.map((item) => (<PopOver key={item} item={item} trigger={"hover"} />))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Box mr={10} className={styles.cart} cursor={"pointer"}>
              <Box className={styles.count} onClick={()=>Navigate("/cart")} >{cart.total}</Box>
              <Image src="./cart.png" className={styles.icon}/>
            </Box>
            {token ? <UserIcon logout={handleLogout}/> : <Login login={()=> Navigate("/login")} />}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {navItems.map((item) => (
                <PopOver key={item} item={item} trigger={"click"} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}