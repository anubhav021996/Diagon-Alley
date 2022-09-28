const express=  require("express");
const router= express.Router();
const {body, validationResult}= require("express-validator");
const jwt= require("jsonwebtoken");
require("dotenv").config();

const Authentication= require("../middlewares/authentication.middleware");
const User= require("../models/user.model");

const newToken= (user) => jwt.sign({user},process.env.screatKey);

router.get("",async(req,res)=>{
    try{
        const user= await User.find().lean().exec();
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const user= await User.findById(req.params.id).lean().exec();
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.post("",
    body("firstName").notEmpty().withMessage("First name required").bail().isString().withMessage("Invalid first name"),
    body("lastName").notEmpty().withMessage("Last name required").bail().isString().withMessage("Invalid last name"),
    body("email").notEmpty().withMessage("Email required").bail().isEmail().withMessage("Invalid email"),
    body("mobile").notEmpty().withMessage("Mobile number required").bail().isNumeric().withMessage("Invalid mobile number").bail().isLength({min:10,max:10}).withMessage("Mobile number should be of 10 digits"),
    body("dateOfBirth").notEmpty().withMessage("DOB required").bail().isDate().withMessage("Invalid date"),
    body("gender").notEmpty().withMessage("gender required").bail().isString().withMessage("Invalid gender").bail().custom((value)=>{
        if(value==="male" || value==="female" || value==="others") return true;
        throw new Error("Gender should be Male, Female or Others");
    }),
    body("password").notEmpty().withMessage("Password Required").bail().isStrongPassword().withMessage("Password should be Strong"),
    body("type").notEmpty().withMessage("Type required").bail().isString().withMessage("Invalid type").bail().custom((value)=>{
        if(value==="user" || value==="seller") return true;
        throw new Error("type should be user or seller");
    }),
async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newErrors= errors.array().map((el)=>({key:el.param, msg: el.msg}));
            return res.status(400).send({errors: newErrors});
        }

        let user= await User.findOne({email: req.body.email}).lean().exec();
        if(user) return res.status(400).send("User already exists");

        user= await User.create(req.body);
        const token= newToken(user);

        res.status(500).send({user,token});
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