const express= require("express");
const app= express();

const connect= require("./configs/db");
const userController= require("./controllers/user.controller");
const productController= require("./controllers/product.controller");
const loginController= require("./controllers/login.controllers");
const addressController= require("./controllers/address.controller");
const cartController= require("./controllers/cart.controller");
const ordersController= require("./controllers/orders.controller");

app.use(express.json());

app.use("/user",userController);
app.use("/product",productController);
app.use("/login",loginController);
app.use("/address",addressController);
app.use("/cart",cartController);
app.use("/orders",ordersController);

app.listen(2548,async()=>{
    try{
        await connect();
        console.log("Listening to port no. 2548");
    }
    catch(e){
        console.log(e.message);
    }
});