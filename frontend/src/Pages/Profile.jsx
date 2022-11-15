import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const Navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  return (
    <Center py={6} mt={5}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={user?.avatar}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {user?.firstName} {user?.lastName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {user?.email}
        </Text>

        <Badge
          px={2}
          py={1}
          bg={useColorModeValue("gray.50", "gray.800")}
          fontWeight={"400"}
        >
          Type - {user?.type}
        </Badge>

        <Stack mt={5} direction={"row"}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
            onClick={() => Navigate("/editProfile")}
          >
            Edit Profile
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};
