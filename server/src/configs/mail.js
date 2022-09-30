const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.user, 
      pass: process.env.pass, 
    },
});