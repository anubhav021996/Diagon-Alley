const express= require("express");
const router= express.Router();
const {body,validationResult}= require("express-validator");
const jwt= require("jsonwebtoken");
require("dotenv").config();

const UserV= require("../models/emailVerification.model");

const newToken= (user) => jwt.sign({user},process.env.screatKey);

router.post("",
body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid email"),
body("otp").notEmpty().withMessage("Otp is required").bail().isNumeric().withMessage("Invalid otp").bail().isLength({min:4,max:4}).withMessage("Invalid otp"),
async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newErrors= errors.array().map((el)=>({key:el.param,msg:el.msg}));
            return res.status(400).send(newErrors);
        }

        const user= await UserV.findOne({email:req.body.email});

        if(user.otp!=req.body.otp) return res.status(400).send("Incorrect otp");

        const token= newToken(user);
        res.status(200).send(token);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;