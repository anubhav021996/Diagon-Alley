import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stack, Text, Button, Heading, Box, Skeleton } from "@chakra-ui/react";

export const Address = () => {
  const { token } = useSelector((store) => store.auth);
  const [address, setAddress] = useState(null);
  const [add, setAdd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [del, setDel] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/address`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let add = res.data.address.map((e) => e.split(","));
        setAdd(res.data);
        setAddress(add);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  const deleteAdd = (i) => {
    setDel(true);
    address.splice(i, 1);
    let addArr = address.map((e) => e.join(","));
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/address/${add._id}`,
        { address: addArr },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setAdd(res.data);
        let add = res.data.address.map((e) => e.split(","));
        setAddress(add);
        setDel(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Stack align={"center"} p="4">
        <Heading fontSize={"2xl"} textAlign={"center"}>
          My Addresses
        </Heading>
      </Stack>
      {loading ? (
        <Skeleton h={400} w={1200} m={10} />
      ) : (
        <Box ml={10} mr={10} display="flex" flexDirection={["column", "row"]}>
          {address?.map((e, i) => (
            <Stack
              p="4"
              boxShadow="lg"
              m="4"
              borderRadius="sm"
              key={i}
              minW={"300px"}
              textAlign={"center"}
            >
              <Text fontWeight="semibold">{e[0]},</Text>
              <Text fontWeight="semibold">{e[1]},</Text>
              <Text fontWeight="semibold">{e[2]},</Text>
              <Text fontWeight="semibold">{e[3]}</Text>
              <Text fontWeight="semibold">Pincode: {e[4]}</Text>
              <Text fontWeight="semibold">Mobile: {e[5]}</Text>
              <Button
                width={"100%"}
                variant="outline"
                colorScheme="green"
                disabled={del}
                onClick={() =>
                  Navigate("/updateAddress", { state: { index: i } })
                }
              >
                Update Address
              </Button>
              <Button
                width={"100%"}
                colorScheme="green"
                disabled={del}
                onClick={() => deleteAdd(i)}
              >
                Delete Address
              </Button>
            </Stack>
          ))}
        </Box>
      )}
      <Button onClick={() => Navigate("/addAddress")}>Add new address</Button>
    </>
  );
};
