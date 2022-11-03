import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useRadio, Box, useRadioGroup, HStack, Stack, Text, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const AddressItem= ({setCheckout,setAddress}) => {
    const {token}= useSelector((store)=>store.auth);
    const [options,setOptions]= useState(null);
    const Navigate= useNavigate();
    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/address`,{ headers: {
            Authorization: 'Bearer ' + token 
          }}).then((res)=>{
            setOptions(res.data.address);
          })
          .catch((e)=>{
            console.log(e);
          })
    },[token]);

    const AddressCard= ({add}) => {
        let e= add.split(",");
        return (
            <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" direction={{ base: 'column', md: 'row' }}>
          <Stack>
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">{e[0]},</Text>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">{e[1]},</Text>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">{e[2]},</Text>
          <Text fontWeight="semibold">{e[3]}</Text>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">Pincode: {e[4]}</Text>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">Mobile: {e[5]}</Text>
        </Stack>
        </Stack>
      </Stack>
        )
    }

    function RadioCard(props) {
        const { getInputProps, getCheckboxProps } = useRadio(props)
      
        const input = getInputProps()
        const checkbox = getCheckboxProps()
      
        return (
          <Box as='label'>
            <input {...input} />
            <Box
            width={350}
              {...checkbox}
              cursor='pointer'
              borderWidth='1px'
              borderRadius='md'
              boxShadow='md'
              _checked={{
                bg: 'teal.600',
                color: 'white',
                borderColor: 'teal.600',
              }}
              _focus={{
                boxShadow: 'outline',
              }}
              px={5}
              py={3}
            >
              {props.children}
            </Box>
          </Box>
        )
      }

      const handleChange= (e) => {
        setCheckout(e);
      }

      const handleBack= () => {
        setAddress(false);
        setCheckout("");
      }

      const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: handleChange,
      })
    
      const group = getRootProps()

    return (
      <>
      <ArrowBackIcon onClick={handleBack} cursor={"pointer"} />
        <HStack {...group} flexWrap="wrap" gap="5">
        {options?.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio} >
            <AddressCard add={value} />
          </RadioCard>
        )
      })}
      </HStack>
      <Button onClick={()=>Navigate("/addAddress")}>Add new address</Button>
      </>
    );
}