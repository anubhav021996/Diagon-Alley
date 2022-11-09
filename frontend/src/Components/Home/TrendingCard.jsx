import {
    AspectRatio,
    Box,
    HStack,
    Image,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
  
  export const TrendingCard = ({title, cat, image, id}) => {
    const Navigate= useNavigate();

    return (
      <Stack p={4} backgroundColor="#e6e8e8" borderRadius="2xl" spacing={useBreakpointValue({ base: '4', md: '5' })} boxShadow= "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={image}
              alt={title}
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
              onClick={()=>{
                Navigate(`/productDetails`,{state:{id: id}});
              }}
              cursor="pointer"
            />
          </AspectRatio>
        </Box>
        <Stack>
          <Stack spacing="3">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}
            onClick={()=>{
              Navigate(`/productDetails`,{state:{id: id}});
            }}
            cursor="pointer" align={"left"}
            overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}
            >
              {title}
            </Text>
          </Stack>
          <HStack>
            <Text overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} align={"left"} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {cat}
            </Text>
          </HStack>
        </Stack>
      </Stack>
    )
  }