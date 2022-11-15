import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const { token } = useSelector((store) => store.auth);
  const toast = useToast();

  if (!token) {
    toast({
      title: "Please signin to your account!",
      status: "info",
      position: "top",
      isClosable: true,
    });
    return <Navigate to="/login" />;
  }
  return children;
};

export const SellerPrivateRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (user?.type == "user") return <Navigate to="/" />;
  return children;
};

export const TokenPrivateRoutes = ({ children }) => {
  const { token } = useSelector((store) => store.auth);

  if (token) return <Navigate to="/" />;
  return children;
};
