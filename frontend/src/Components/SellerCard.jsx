import {
    Badge,
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from './Products/PriceTag';

export const SellerCard= ({product, deleteProduct}) => {
    const Navigate= useNavigate();
    return(
        <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '540px' }}
        height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}>
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
              product.image
            }
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          gap={4}
          pt={2}>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {product.title}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
          {product.category}
          </Text>
          <Stack justifyContent={'space-between'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {formatPrice(product.price,"INR")}
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {product.quantity}
            </Badge>
          </Stack>

          <Stack
            width={'100%'}
            mt={'2rem'}
            direction={'row'}
            padding={2}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200',
              }} onClick={()=>deleteProduct(product._id)}>
              Delete
            </Button>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }} onClick={()=>Navigate("/editProduct",{state:{product:product}})} >
              Edit 
            </Button>
          </Stack>
        </Stack>
      </Stack>
    )
}