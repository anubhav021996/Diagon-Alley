import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  Progress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/Login/actionLogin";

export const EditProfile = () => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const toast = useToast();
  const [isUpload, setIsUpload] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
  });

  const { token, user } = useSelector((store) => store.auth);

  useEffect(() => {
    setFormData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      avatar: user?.avatar,
    });
  }, []);

  const handleChange = (e) => {
    const { value, name, type, files } = e.target;
    if (type !== "file") {
      setFormData({ ...formData, [name]: value });
    } else {
      setIsUpload(true);
      const picData = new FormData();
      picData.append("file", files[0]);
      picData.append("upload_preset", "diagonAlley");
      axios
        .post(process.env.REACT_APP_IMAGE_URL, picData)
        .then((res) => {
          setFormData({ ...formData, [name]: res.data.url });
        })
        .catch((e) => {
          toast({
            title: e.response.data.error.message,
            status: "error",
            position: "top",
            isClosable: true,
          });
        })
        .finally(() => {
          setIsUpload(false);
        });
    }
  };

  const handleSubmit = () => {
    setIsUpload(true);
    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/user`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        Dispatch(addUser(res.data));
        setIsUpload(false);
        Navigate("/profile");
      })
      .catch((e) => {
        if (e.response.data.errors) {
          let err = e.response.data.errors;
          err.map(({ msg }) =>
            toast({
              title: msg,
              status: "error",
              position: "top",
              isClosable: true,
            })
          );
        } else {
          toast({
            title: e.response.data,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
        setIsUpload(false);
      });
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Edit Profile
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </FormControl>
              </Box>
            </HStack>

            <FormControl id="photo" isRequired>
              <FormLabel>Profile Photo</FormLabel>
              <Input
                type="file"
                name="avatar"
                onChange={handleChange}
                disabled={isUpload}
              />
              {isUpload && <Progress size="xs" isIndeterminate />}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
                disabled={isUpload}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
