import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Heading, useRadio, Box, useRadioGroup, HStack, Stack, Text } from '@chakra-ui/react';

export const AddressItem= ({setCheckout}) => {
    const {token}= useSelector((store)=>store.auth);
    const [options,setOptions]= useState(null);
    
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
        setCheckout(true);
      }

      const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: handleChange,
      })
    
      const group = getRootProps()

    return (
      <>
          <Heading fontSize={'xl'} textAlign={'center'}>
            Select Address
          </Heading>
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
      </>
    );
}