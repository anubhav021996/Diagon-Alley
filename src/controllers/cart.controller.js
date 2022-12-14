const express= require("express");
const router= express.Router();

const Cart= require("../models/cart.model");
const authentication= require("../middlewares/authentication.middleware");
const cartAuthorization= require("../middlewares/cartAuthorization.middleware");

router.post("",authentication,async(req,res)=>{
    try{
        req.body.user_id= req.user._id;
        let cart= await Cart.findOne({user_id:req.user._id});
        if(cart) return res.status(400).send("Cart already exists");

        cart= await Cart.create(req.body);
        res.status(200).send(cart);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.patch("/:id",authentication,cartAuthorization,async(req,res)=>{
    try{
        const cart= await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).send(cart);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.delete("/:id",authentication,cartAuthorization,async(req,res)=>{
    try{
        const cart= await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send(cart);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("",authentication,async(req,res)=>{
    try{
        const id= req.user._id;
        const cart= await Cart.findOne({user_id:id}).populate("product_id").lean().exec();
        res.status(200).send(cart);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;