import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
  Select,
  useToast,
  Progress,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const [isUpload, setIsUpload] = useState(false);
  const toast = useToast();
  const { token } = useSelector((store) => store.auth);
  const Navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    quantity: "",
    category: "",
  });

  const handleChange = (e) => {
    const { value, name, type, files } = e.target;
    if (type !== "file") {
      setProductData({ ...productData, [name]: value });
    } else {
      setIsUpload(true);
      const picData = new FormData();
      picData.append("file", files[0]);
      picData.append("upload_preset", "diagonAlley");
      axios
        .post(process.env.REACT_APP_IMAGE_URL, picData)
        .then((res) => {
          setProductData({ ...productData, [name]: res.data.url });
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
      .post(`${process.env.REACT_APP_BASE_URL}/product`, productData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setIsUpload(false);
        Navigate("/sellerDashboard");
      })
      .catch((e) => {
        e.response.data.errors.map((el) =>
          toast({
            title: el.msg,
            status: "error",
            position: "top",
            isClosable: true,
          })
        );
        setIsUpload(false);
      });
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={800}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Add Product
        </Heading>
        <FormControl isRequired>
          <FormLabel>Product Title</FormLabel>
          <Input type="text" name="title" onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Product Description</FormLabel>
          <Textarea name="description" onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Product Image</FormLabel>
          <Input
            type="file"
            name="image"
            onChange={handleChange}
            disabled={isUpload}
          />
          {isUpload && <Progress size="xs" isIndeterminate />}
        </FormControl>
        <Stack>
          <HStack>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input type="number" name="price" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input type="text" name="quantity" onChange={handleChange} />
            </FormControl>
          </HStack>
        </Stack>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            name="category"
            onChange={handleChange}
          >
            <option value="Ollivander's Wands">Ollivander's Wands</option>
            <option value="Weasleys' Wheezes">Weasleys' Wheezes</option>
            <option value="Sweet Trolley">Sweet Trolley</option>
          </Select>
        </FormControl>
        <Stack spacing={6}>
          <Button
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
    </Flex>
  );
};
