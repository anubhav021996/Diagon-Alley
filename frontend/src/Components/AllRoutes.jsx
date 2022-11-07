import {Routes, Route} from "react-router-dom";
import { Home } from "../Pages/Home";
import { Signin } from "../Pages/Signin";
import { User } from "../Pages/User";
import { ResetPassword } from "../Pages/ResetPassword";
import { Seller } from "../Pages/Seller";
import { AddProduct } from "../Pages/AddProduct";
import { AddAddress } from "../Pages/AddAddress";
import { Address } from "../Pages/Address";
import { UpdateAddress } from "../Pages/UpdateAddress";
import { SellerDashboard } from "../Pages/SellerDashboard";
import { EditProduct } from "../Pages/EditProduct";
import { Profile } from "../Pages/Profile";
import { EditProfile } from "../Pages/EditProfile";
import { Product } from "../Pages/Product";
import { PrivateRoutes, SellerPrivateRoute, TokenPrivateRoutes } from "./PrivateRoutes";
import { PaymentSuccess } from "../Pages/PaymentSuccess";
import { Orders } from "../Pages/Orders";

export const AllRoutes= () => {
    return(
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<TokenPrivateRoutes><Signin /></TokenPrivateRoutes>} />
            <Route path={"/user"} element={<TokenPrivateRoutes><User /></TokenPrivateRoutes>} />
            <Route path={"/resetPassword"} element={<TokenPrivateRoutes><ResetPassword /></TokenPrivateRoutes>} />
            <Route path={"/seller"} element={<PrivateRoutes><Seller /></PrivateRoutes>} />
            <Route path={"/sellerDashboard"} element={<PrivateRoutes><SellerPrivateRoute><SellerDashboard /></SellerPrivateRoute></PrivateRoutes>} />
            <Route path={"/addProduct"} element={<PrivateRoutes><SellerPrivateRoute><AddProduct /></SellerPrivateRoute></PrivateRoutes>} />
            <Route path={"/editProduct"} element={<PrivateRoutes><SellerPrivateRoute><EditProduct /></SellerPrivateRoute></PrivateRoutes>} />
            <Route path={"/addAddress"} element={<PrivateRoutes><AddAddress /></PrivateRoutes>} />
            <Route path={"/updateAddress"} element={<PrivateRoutes><UpdateAddress /></PrivateRoutes>} />
            <Route path={"/address"} element={<PrivateRoutes><Address /></PrivateRoutes>} />
            <Route path={"/profile"} element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path={"/editProfile"} element={<PrivateRoutes><EditProfile /></PrivateRoutes>} />
            <Route path={"/product"} element={<Product />} />
            <Route path={"/paymentSuccess"} element={<PrivateRoutes><PaymentSuccess /></PrivateRoutes>} />
            <Route path={"/orders"} element={<PrivateRoutes><Orders /></PrivateRoutes>} />
        </Routes>
    )
}