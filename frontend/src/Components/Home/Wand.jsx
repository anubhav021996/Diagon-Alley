import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Wand = () => {
  const Navigate = useNavigate();

  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              The Wand
            </Text>
            <br />
            <Text as={"span"} color={"blue.400"}>
              chooses the Wizard!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            A wand channels a witch or wizard's power & abilities. Every wand is
            unique and made from various types of wood surrounding a core of
            magical substances.
          </Text>
          <Box direction={{ base: "column", sm: "row" }}>
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"blue"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              onClick={() =>
                Navigate("/product", {
                  state: {
                    cat: {
                      name: "Ollivander's Wands",
                      img: "https://res.cloudinary.com/dyocvbqbf/image/upload/v1667925055/Manuals/ollivanders_copy_llgpps.jpg",
                    },
                  },
                })
              }
            >
              Discover your wand
            </Button>
          </Box>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={
                "https://res.cloudinary.com/dyocvbqbf/image/upload/v1668012141/Manuals/fantastic-beasts-cog-crop-no-wm_dcnd3v.jpg"
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};
