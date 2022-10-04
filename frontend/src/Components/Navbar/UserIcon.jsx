import {Menu,MenuButton,Button,Avatar,MenuList,MenuItem,MenuDivider} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

export const UserIcon= ({logout}) => {
  const {user}= useSelector((store)=>store.auth);

    return(
        <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={user?.avatar}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My Orders</MenuItem>
                <Link to="/address"><MenuItem>My Addresses</MenuItem></Link>
                <MenuItem>Become a seller</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
    )
}