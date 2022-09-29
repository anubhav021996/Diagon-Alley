const express= require("express");
const router= express.Router();
const {body,validationResult}= require("express-validator");

const Product= require("../models/product.model");
const authentication= require("../middlewares/authentication.middleware");
const productAuthorization= require("../middlewares/productAuthorization.middleware");

router.post("",
body("title").notEmpty().withMessage("Title required").bail().isString().withMessage("Invalid title"),
body("description").notEmpty().withMessage("Description required").bail().isString().withMessage("Invalid description"),
body("image").notEmpty().withMessage("Image required").bail().isURL().withMessage("Invalid image"),
body("price").notEmpty().withMessage("Price required").bail().isNumeric().withMessage("Invalid price"),
body("quantity").notEmpty().withMessage("Quatity required").bail().isNumeric().withMessage("Invalid quantity"),
body("category").notEmpty().withMessage("Category required").bail().isString().withMessage("Invalid category"),
authentication,async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newError= errors.array().map((el)=> ({key: el.param, msg: el.msg}));
            return res.status(400).send({errors: newError});
        }

        req.body.user_id= req.user._id;
        if(req.user.type==="user") return res.status(403).send("Permission Denied");

        const product= await Product.create(req.body);
        res.status(200).send(product);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.patch("/:id",authentication,productAuthorization,async(req,res)=>{
    try{
        const product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).send(product);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.delete("/:id",authentication,productAuthorization,async(req,res)=>{
    try{
        const product= await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(product);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("",async(req,res)=>{
    try{
        const product= await Product.find().lean().exec();
        res.status(200).send(product);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const product= await Product.findById(req.params.id).lean().exec();
        res.status(200).send(product);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;