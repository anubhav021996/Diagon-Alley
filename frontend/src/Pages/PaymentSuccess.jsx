import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
  const { state } = useLocation();
  const Navigate = useNavigate();

  useEffect(() => {
    if (!state) return Navigate("/");
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <img
        width="20%"
        src="https://c.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
        alt="success gif"
      />
      <Heading>Order placed successfully</Heading>
      <Text>
        <b>Order Id: {state.id}</b>
      </Text>

      <Link to="/">
        <Button variant="contained" textDecoration={"underline"}>
          Shop More
        </Button>
      </Link>
    </Box>
  );
};
