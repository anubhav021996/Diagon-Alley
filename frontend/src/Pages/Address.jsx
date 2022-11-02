import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stack, Text, Button, Heading, Box } from '@chakra-ui/react';

export const Address= () => {
    const {token}= useSelector((store)=>store.auth);
    const [address,setAddress]= useState(null);
    const [add,setAdd]= useState(null);
    const Navigate= useNavigate();
    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/address`,{ headers: {
            Authorization: 'Bearer ' + token 
          }}).then((res)=>{
            let add= res.data.address.map((e)=>(e.split(",")));
            setAdd(res.data);
            setAddress(add);
          })
          .catch((e)=>{
            console.log(e);
          })
    },[token]);

    const deleteAdd= (i) => {
      address.splice(i,1);
      let addArr= address.map((e)=>(e.join(",")));
      axios.patch(`${process.env.REACT_APP_BASE_URL}/address/${add._id}`,{address:addArr},{ headers: {
        Authorization: 'Bearer ' + token 
      }}).then((res)=>{
        setAdd(res.data);
        let add= res.data.address.map((e)=>(e.split(",")));
        setAddress(add);
      })
      .catch((e)=>{
        console.log(e);
      })
    }

    return (
      <>
      <Stack align={'center'} p="4" >
          <Heading fontSize={'2xl'} textAlign={'center'}>
            My Addresses
          </Heading>
        </Stack>
        <Box ml={10} mr={10} display="flex" flexDirection={["column", "row"]} >
      {address?.map((e,i)=>(
        <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" key={i} minW={"300px"} textAlign={'center'} >
          <Text fontWeight="semibold">{e[0]},</Text>
          <Text fontWeight="semibold">{e[1]},</Text>
          <Text fontWeight="semibold">{e[2]},</Text>
          <Text fontWeight="semibold">{e[3]}</Text>
          <Text fontWeight="semibold">Pincode: {e[4]}</Text>
          <Text fontWeight="semibold">Mobile: {e[5]}</Text>
        <Button width={"100%"} variant="outline" colorScheme="green" onClick={()=>Navigate("/updateAddress",{state:{index:i}})}>
              Update Address
            </Button>
            <Button width={"100%"} colorScheme="green" onClick={()=>deleteAdd(i)}>Delete Address</Button>
      </Stack>
      ))}
      </Box>
      <Button onClick={()=>Navigate("/addAddress")}>Add new address</Button>
      </>
    );
}