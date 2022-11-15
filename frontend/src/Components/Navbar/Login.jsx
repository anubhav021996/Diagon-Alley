import { Button } from "@chakra-ui/react";

export const Login = ({ login }) => {
  return (
    <Button
      variant={"solid"}
      colorScheme={"teal"}
      size={"sm"}
      mr={4}
      onClick={login}
    >
      Sign in
    </Button>
  );
};
