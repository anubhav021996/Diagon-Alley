const express= require("express");
const router= express.Router();
const {body, validationResult}= require("express-validator");

const Address= require("../models/address.model");
const authentication= require("../middlewares/authentication.middleware");
const addressAuthorization= require("../middlewares/addressAuthorization.middleware");

router.post("",authentication,async(req,res)=>{
    try{
        req.body.user_id= req.user._id;
        let address= await Address.findOne({user_id:req.user._id});
        if(address) return res.status(400).send("Address already exists");

        address= await Address.create(req.body);
        res.status(200).send(address);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.patch("/:id",
body("address").notEmpty().withMessage("Address required"),
authentication,addressAuthorization,async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newErrors= errors.array().map((el)=>({key:el.param, msg: el.msg}));
            return res.status(400).send({errors: newErrors});
        }

        const address= await Address.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).send(address);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.delete("/:id",authentication,addressAuthorization,async(req,res)=>{
    try{
        const address= await Address.findByIdAndDelete(req.params.id);
        res.status(200).send(address);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("",authentication,async(req,res)=>{
    try{
        const id= req.user._id;
        const address= await Address.findOne({user_id:id}).lean().exec();
        res.status(200).send(address);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;