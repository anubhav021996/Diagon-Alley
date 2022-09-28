const express= require("express");
const router= express.Router();

const Orders= require("../models/orders.model");
const authentication= require("../middlewares/authentication.middleware");
const ordersAuthorization= require("../middlewares/ordersAuthorization.middleware");

router.post("",authentication,async(req,res)=>{
    try{
        req.body.user_id= req.user._id;
        let orders= await Orders.findOne({user_id:req.user._id});
        if(orders) return res.status(400).send("Orders already exists");

        orders= await Orders.create(req.body);
        res.status(200).send(orders);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.patch("/:id",authentication,ordersAuthorization,async(req,res)=>{
    try{
        const orders= await Orders.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).send(orders);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.delete("/:id",authentication,ordersAuthorization,async(req,res)=>{
    try{
        const orders= await Orders.findByIdAndDelete(req.params.id);
        res.status(200).send(orders);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("",authentication,async(req,res)=>{
    try{
        const id= req.user._id;
        const orders= await Orders.findOne({user_id:id}).lean().exec();
        res.status(200).send(orders);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;