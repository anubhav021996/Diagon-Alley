import {
  Box,
  ButtonGroup,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";

export const Footer = () => (
  <Box
    py={{ base: "12", md: "16" }}
    mt={10}
    px={5}
    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
  >
    <Stack spacing={{ base: "4", md: "5" }}>
      <Stack justifyContent={"space-between"} direction="row" align="center">
        <Image src="./logo.png" alt="logo" align={"left"} w={"20%"} />
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/anubhav021996/"
            target="_blank"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://github.com/anubhav021996"
            target="_blank"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="tel:+918127618286"
            target="_blank"
            aria-label="Phone"
            icon={<FaPhone fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text>Made with ❤️ by Anubhav Varshney</Text>
    </Stack>
  </Box>
);
