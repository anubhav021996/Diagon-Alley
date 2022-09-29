const express= require("express");
const router= express.Router();
const {body,validationResult}= require("express-validator");
const jwt= require("jsonwebtoken");
require("dotenv").config();

const User= require("../models/user.model");

const newToken= (user) => jwt.sign({user},process.env.screatKey);

router.post("",
body("email").notEmpty().withMessage("Email required").bail().isEmail().withMessage("Invalid email"),
body("password").notEmpty().withMessage("Password required"),
async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            const newError= errors.array.map((el)=>({key:el.params, msg:el.msg}));
            return res.status(400).send({errors: newError});
        }
        
        let user= await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send("Invalid Credentials");

        const match= user.checkPassword(req.body.password);
        if(!match) return res.status(400).send("Invalid Credentials");

        let token= newToken(user);

        res.status(200).send({user,token});
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;