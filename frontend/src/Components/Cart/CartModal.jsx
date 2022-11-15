import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { AddressItem } from "./AddressItem";
import { CartItem } from "./CartItem";
import { Link as ReachLink } from "react-router-dom";
import { CartOrderSummary } from "./CartOrderSummary";

export const CartModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState(false);
  const [editCart, setEditCart] = useState(false);
  const [checkout, setCheckout] = useState("");
  const { items } = useSelector((store) => store.cart);

  const openModal = () => {
    setAddress(false);
    setCheckout("");
    onOpen();
  };

  return (
    <>
      <Box mr={10} className={styles.cart} cursor={"pointer"}>
        <Box className={styles.count} onClick={openModal}>
          {items.length}
        </Box>
        <Image src="./cart.png" className={styles.icon} />
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={"outside"}>
        <ModalOverlay />
        <ModalContent minW={"75%"}>
          <ModalCloseButton />
          <ModalBody>
            <Box
              maxW={{ base: "3xl", lg: "7xl" }}
              mx="auto"
              px={{ base: "4", md: "8", lg: "12" }}
              py={{ base: "6", md: "8", lg: "12" }}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
                spacing={{ base: "8", md: "16" }}
              >
                <Stack spacing={{ base: "8", md: "10" }} flex="2">
                  <Heading fontSize="2xl" fontWeight="extrabold">
                    Shopping Cart ({items.length} items)
                  </Heading>
                  {!items.length && <Image src="./emptyCart.png" />}
                  {address ? (
                    <AddressItem
                      setCheckout={setCheckout}
                      setAddress={setAddress}
                      close={onClose}
                    />
                  ) : (
                    <Stack spacing="6">
                      {items.map((item) => (
                        <CartItem
                          editCart={editCart}
                          setEditCart={setEditCart}
                          key={item.id}
                          item={item}
                          onClose={onClose}
                        />
                      ))}
                    </Stack>
                  )}
                </Stack>

                <Flex direction="column" align="center" flex="1">
                  <CartOrderSummary
                    editCart={editCart}
                    setAddress={setAddress}
                    address={address}
                    checkout={checkout}
                    close={onClose}
                  />
                  <HStack mt="6" fontWeight="semibold">
                    <p>or</p>
                    <Link
                      as={ReachLink}
                      color={mode("blue.500", "blue.200")}
                      to="/"
                      onClick={onClose}
                    >
                      Continue shopping
                    </Link>
                  </HStack>
                </Flex>
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
