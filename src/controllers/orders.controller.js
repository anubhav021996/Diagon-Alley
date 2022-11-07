const express= require("express");
const router= express.Router();
const shortid = require("shortid");
const Razorpay = require("razorpay");

const Orders= require("../models/orders.model");
const Products= require("../models/product.model");
const authentication= require("../middlewares/authentication.middleware");
const ordersAuthorization= require("../middlewares/ordersAuthorization.middleware");
const { orderMail, orderMailAdmin } = require("../utilis");

router.post("",authentication,async(req,res)=>{
    try{
        req.body.user_id= req.user._id;

        let orders= await Orders.create(req.body);

        let obj={};
        for(let i=0;i<orders.product_id.length;i++){
            let id= orders.product_id[i];
            let product= await Products.findById(id);
            await Products.findByIdAndUpdate(id,{quantity:product.quantity-1},{new:true});
            product.title in obj ? obj[product.title]++ : obj[product.title]= 1;
        }
        orderMail(req.user,obj);
        orderMailAdmin(req.user,obj);

        res.status(200).send(orders);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  
  router.post("/razorpay", async (req, res) => {
    try{
        const payment_capture = 1;
        const amount = Number(req.body.amount);
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: shortid.generate(),
            payment_capture,
        };
        const response = await razorpay.orders.create(options);
  
    res.json({
      id: response.id,
      currency: "INR",
      amount: response.amount,
    });
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
        const orders= await Orders.find({user_id:id}).populate("product_id").lean().exec();
        res.status(200).send(orders);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;