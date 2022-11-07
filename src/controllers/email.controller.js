const express= require("express");
const router= express.Router();
const {body,validationResult}= require("express-validator");
const User= require("../models/user.model");
const UserV= require("../models/emailVerification.model");
const { verifyOtp } = require("../utilis");

router.post("",
body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid email"),
body("type").notEmpty().withMessage("Type is required").bail().isString().withMessage("Invalid type").bail().custom((value)=>{
    if(value==="register" || value==="reset") return true;
        throw new Error("type should be register or reset");
}),
async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newErrors= errors.array().map((el)=>({key:el.param,msg:el.msg}));
            return res.status(400).send({errors:newErrors});
        }

        let user= await User.findOne({email:req.body.email});
        if(user && req.body.type=="register") return res.status(400).send("User already exists");
        if(!user && req.body.type=="reset") return res.status(400).send("No user found");

        const otp= Math.floor(Math.random() * (9999 - 1000) + 1000);

        user= await UserV.findOne({email:req.body.email});

        let userV;
        if(user) userV= await UserV.findByIdAndUpdate(user._id,{otp:otp},{new:true});
        else userV= await UserV.create({email:req.body.email,otp:otp});

        verifyOtp(userV);
        res.status(201).send("Otp sent");
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;