import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UserIcon = ({ logout }) => {
  const { user } = useSelector((store) => store.auth);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"sm"} src={user?.avatar} />
      </MenuButton>
      <MenuList>
        <Link to="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link to="/orders">
          <MenuItem>My Orders</MenuItem>
        </Link>
        <Link to="/address">
          <MenuItem>My Addresses</MenuItem>
        </Link>
        {user?.type === "seller" ? (
          <Link to="/sellerDashboard">
            <MenuItem>Seller Dashboard</MenuItem>
          </Link>
        ) : (
          <Link to="/seller">
            <MenuItem>Become a seller</MenuItem>
          </Link>
        )}
        <MenuDivider />
        <MenuItem onClick={logout}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};
