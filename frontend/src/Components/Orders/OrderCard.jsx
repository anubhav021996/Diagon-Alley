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
} from "@chakra-ui/react";
import { PriceTag } from "../Products/PriceTag";

export const OrderCard = ({ product }) => {
  const { title, image, price, count } = product;

  return (
    <Stack
      spacing={useBreakpointValue({ base: "4", md: "5" })}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
    >
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image}
            alt={title}
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: "md", md: "xl" })}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Stack spacing="2">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            {title}
          </Text>
          <HStack justifyContent={"space-between"} padding={5}>
            <PriceTag price={price} currency="INR" />
            <Text
              fontWeight="medium"
              color={useColorModeValue("gray.700", "gray.400")}
            >
              Qty: {count}
            </Text>
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  );
};
