const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const newToken = (user) => jwt.sign({ user }, process.env.screatKey);

const passport = require("./configs/google_oauth");

const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");
const loginController = require("./controllers/login.controllers");
const addressController = require("./controllers/address.controller");
const cartController = require("./controllers/cart.controller");
const ordersController = require("./controllers/orders.controller");
const emailController = require("./controllers/email.controller");
const otpController = require("./controllers/otp.controller");

app.use(cors());

const session = require("express-session");
app.use(session({ secret: process.env.secret }));

app.use(express.json());

app.use("/user", userController);
app.use("/product", productController);
app.use("/login", loginController);
app.use("/address", addressController);
app.use("/cart", cartController);
app.use("/orders", ordersController);
app.use("/email", emailController);
app.use("/otp", otpController);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const { user } = req;
    const token = newToken(user);
    return res.status(200).send({ user, token });
  }
);

let port = process.env.PORT || 2548;
app.listen(port, async () => {
  try {
    await connect();
    console.log("Listening");
  } catch (e) {
    console.log(e.message);
  }
});
