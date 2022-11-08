import {
    Image,
    Text,
    VStack,
  } from '@chakra-ui/react'
  import * as React from 'react'
  
  export const CartProductMeta = (props) => {
    const { image, title } = props
    return (
      <>
      <VStack width="full">
        <Text fontWeight="medium">{title}</Text>
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