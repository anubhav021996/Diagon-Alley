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
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from './User';
import { Login } from './Login';

const navItems = ['Departments', 'Collections', 'Characters'];

export const Navbar= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate= useNavigate();
  const [login, setLogin]= useState(false);

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
            <Box>
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
              <Box className={styles.count}>8</Box>
              <Image src="./cart.png" className={styles.icon}/>
            </Box>
            {login ? <User logout={()=>setLogin(false)}/> : <Login login={()=> Navigate("/login")} />}
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