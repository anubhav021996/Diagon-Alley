const express= require("express");
const app= express();
const jwt= require("jsonwebtoken");
require("dotenv").config();

const newToken= (user) => jwt.sign({user},process.env.screatKey);

const passport= require("./configs/google_oauth");

const connect= require("./configs/db");
const userController= require("./controllers/user.controller");
const productController= require("./controllers/product.controller");
const loginController= require("./controllers/login.controllers");
const addressController= require("./controllers/address.controller");
const cartController= require("./controllers/cart.controller");
const ordersController= require("./controllers/orders.controller");

const session = require('express-session');
app.use(session({ secret: 'SECRET' }));

app.use(express.json());

app.use("/user",userController);
app.use("/product",productController);
app.use("/login",loginController);
app.use("/address",addressController);
app.use("/cart",cartController);
app.use("/orders",ordersController);

passport.serializeUser(function (user, done) {
    done(null, user);
});
  
passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}),(req,res)=>{
    const {user}= req;
    const token= newToken(user);
    return res.status(200).send({user,token});
});

app.listen(2548,async()=>{
    try{
        await connect();
        console.log("Listening to port no. 2548");
    }
    catch(e){
        console.log(e.message);
    }
});