import {
  CloseButton,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../Redux/Cart/actionCart";
import { PriceTag } from "../Products/PriceTag";
import { CartProductMeta } from "./CartProductMeta";

export const CartItem = ({ item, onClose, editCart, setEditCart }) => {
  const Dispatch = useDispatch();
  const {
    cart,
    auth: { token },
  } = useSelector((store) => store);
  const { title, description, count, image, price, id } = item;

  const editItems = (prod) => {
    setEditCart(true);
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/cart/${cart.id}`,
        { product_id: prod },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/cart`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            Dispatch(addItem(res.data.product_id));
            setEditCart(false);
          });
      });
  };

  const handleIncreament = () => {
    if (count == 5) return;
    cart.product_id.push(id);
    editItems(cart.product_id);
  };

  const handleDecreament = () => {
    if (count == 1) return;
    for (let i = 0; i < cart.product_id.length; i++) {
      if (cart.product_id[i]._id == id) {
        cart.product_id.splice(i, 1);
        break;
      }
    }
    editItems(cart.product_id);
  };

  const handleDelete = () => {
    let prods = cart.product_id.filter((e) => e._id != id);
    editItems(prods);
  };

  return (
    <Flex
      p={4}
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        title={title}
        description={description}
        image={image}
        id={id}
        onClose={onClose}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <NumberInput size="sm" maxW={20} defaultValue={count} min={1} max={5}>
          <NumberInputField disabled />
          <NumberInputStepper>
            <NumberIncrementStepper onClick={handleIncreament} />
            <NumberDecrementStepper onClick={handleDecreament} />
          </NumberInputStepper>
        </NumberInput>
        <PriceTag price={price} currency="INR" />
        <CloseButton
          disabled={editCart}
          aria-label={`Delete ${title} from cart`}
          onClick={handleDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <NumberInput size="sm" maxW={20} defaultValue={count} min={1} max={5}>
          <NumberInputField disabled />
          <NumberInputStepper>
            <NumberIncrementStepper onClick={handleIncreament} />
            <NumberDecrementStepper onClick={handleDecreament} />
          </NumberInputStepper>
        </NumberInput>
        <PriceTag price={price} currency="INR" />
        <CloseButton
          disabled={editCart}
          aria-label={`Delete ${title} from cart`}
          onClick={handleDelete}
        />
      </Flex>
    </Flex>
  );
};
