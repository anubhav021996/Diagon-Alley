import {Routes, Route} from "react-router-dom";
import { Home } from "../Pages/Home";
import { Signin } from "../Pages/Signin";
import { Signup } from "../Pages/Signup";
import { User } from "../Pages/User";
import { ForgetPassword } from "../Pages/ForgetPassword";
import { ResetPassword } from "../Pages/ResetPassword";
import { Seller } from "../Pages/Seller";
import { AddProduct } from "../Pages/AddProduct";
import { AddAddress } from "../Pages/AddAddress";
import { Address } from "../Pages/Address";
import { UpdateAddress } from "../Pages/UpdateAddress";
import { SellerDashboard } from "../Pages/SellerDashboard";

export const AllRoutes= () => {
    return(
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/user"} element={<User />} />
            <Route path={"/forgetPassword"} element={<ForgetPassword />} />
            <Route path={"/resetPassword"} element={<ResetPassword />} />
            <Route path={"/seller"} element={<Seller />} />
            <Route path={"/sellerDashboard"} element={<SellerDashboard />} />
            <Route path={"/addProduct"} element={<AddProduct />} />
            <Route path={"/addAddress"} element={<AddAddress />} />
            <Route path={"/updateAddress"} element={<UpdateAddress />} />
            <Route path={"/address"} element={<Address />} />
        </Routes>
    )
}