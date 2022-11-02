const express=  require("express");
const router= express.Router();
const {body, validationResult}= require("express-validator");
const jwt= require("jsonwebtoken");
require("dotenv").config();

const Authentication= require("../middlewares/authentication.middleware");
const User= require("../models/user.model");
const Address= require("../models/address.model");
const Cart= require("../models/cart.model");

const { welcomeMail, adminMail, resetMail, sellerMail, adminSellerMail } = require("../utilis");

const newToken= (user) => jwt.sign({user},process.env.screatKey);

// router.get("",async(req,res)=>{
//     try{
//         const user= await User.find().lean().exec();
//         res.status(200).send(user);
//     }
//     catch(e){
//         res.status(500).send(e.message);
//     }
// });

router.get("",Authentication,async(req,res)=>{
    try{
        const id= req.user._id;
        const user= await User.findById(id).lean().exec();
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.post("",
    body("firstName").notEmpty().withMessage("First name required").bail().isString().withMessage("Invalid first name"),
    body("lastName").notEmpty().withMessage("Last name required").bail().isString().withMessage("Invalid last name"),
    body("avatar").notEmpty().withMessage("Avatar required").bail().isURL().withMessage("Invalid avatar"),
    body("password").notEmpty().withMessage("Password Required").bail().isStrongPassword().withMessage("Password should be Strong"),
    Authentication, async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newErrors= errors.array().map((el)=>({key:el.param, msg: el.msg}));
            return res.status(400).send({errors: newErrors});
        }
        req.body.email=req.user.email;

        let user= await User.findOne({email: req.body.email}).lean().exec();
        if(user) return res.status(400).send("User already exists");

        user= await User.create(req.body);
        const address= await Address.create({user_id:user._id});
        const cart= await Cart.create({user_id:user._id});

        const token= newToken(user);

        welcomeMail(user);
        adminMail(user);
        res.status(200).send({user,token});
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.patch("",Authentication,async(req,res)=>{
    try{
        let id= req.user._id;
        
        const user= await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.patch("/seller",
body("businessName").notEmpty().withMessage("Business name required").bail().isString().withMessage("Invalid business name"),
body("businessAddress").notEmpty().withMessage("Business address required").bail().isString().withMessage("Invalid business address"),
body("gstNumber").notEmpty().withMessage("GST number required").bail().isString().withMessage("Invalid GST number").bail().isLength({min:15,max:15}).withMessage("GST number should be of length 15"),
body("accountNumber").notEmpty().withMessage("Accout number required").bail().isNumeric().withMessage("Invalid account number"),
body("ifscCode").notEmpty().withMessage("IFSC code required").bail().isString().withMessage("Invalid IFSC code").bail().isLength({min:11,max:11}).withMessage("IFSC code should be of length 11"),
body("accountHolderName").notEmpty().withMessage("Account holder name required").bail().isString().withMessage("Invalid Account holder name"),
body("bankName").notEmpty().withMessage("Bank name required").bail().isString().withMessage("Invalid bank name"),
Authentication,async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newErrors= errors.array().map((el)=>({key:el.param, msg: el.msg}));
            return res.status(400).send({errors: newErrors});
        }
        const id= req.user._id;
        req.body.type= "seller";
        
        const user= await User.findByIdAndUpdate(id,req.body,{new:true});
        sellerMail(user);
        adminSellerMail(user);

        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.patch("/reset",
body("password").notEmpty().withMessage("Password required").bail().isStrongPassword().withMessage("Password should be strong"),
Authentication,async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newErrors= errors.array().map((el)=>({key:el.param, msg: el.msg}));
            return res.status(400).send({errors: newErrors});
        }
        
        req.body.email= req.user.email;

        let user= await User.findOne({email: req.body.email});
        user.password= req.body.password;
        await user.save();
        const token= newToken(user);
        resetMail(user);
        res.status(200).send({user,token});
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.delete("",Authentication,async(req,res)=>{
    try{
        let id= req.user._id;
        const user= await User.findByIdAndDelete(id);
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;