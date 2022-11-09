import {
    Image,
    Text,
    VStack,
  } from '@chakra-ui/react'
  import * as React from 'react'
import { useNavigate } from 'react-router-dom';
  
  export const CartProductMeta = (props) => {
    const { image, title, id, onClose } = props;
    const Navigate= useNavigate();
    return (
      <>
      <VStack width="full" cursor="pointer" onClick={()=>{
                Navigate(`/productDetails`,{state:{id:id}});
                onClose();
              }} >
        <Text fontWeight="medium" overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} >{title}</Text>
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={title}
          draggable="false"
          loading="lazy"
        />
      </VStack>
      </>
    )
  }