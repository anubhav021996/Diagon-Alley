import {Routes, Route} from "react-router-dom";
import { Home } from "../Pages/Home";
import { Signin } from "../Pages/Signin";
import { Signup } from "../Pages/Signup";

export const AllRoutes= () => {
    return(
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
        </Routes>
    )
}