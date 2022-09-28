const express= require("express");
const router= express.Router();
const {body,validationResult}= require("express-validator");
const fs= require("fs");

const Product= require("../models/product.model");
const authentication= require("../middlewares/authentication.middleware");
const productAuthorization= require("../middlewares/productAuthorization.middleware");
const upload= require("../middlewares/uploads.middleware");

router.post("",authentication,upload("image"),async(req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            let newError= errors.array().map((el)=> ({key: el.param, msg: el.msg}));
            return res.status(400).send({errors: newError});
        }

        req.body.user_id= req.user._id;
        if(req.user.type==="user") return res.status(403).send("Permission Denied");

        const product= await Product.create({
            title: req.body.title,
            description: req.body.description,
            image: req.file.path,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            user_id: req.body.user_id,
        });
        res.status(200).send(product);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.patch("/:id",authentication,productAuthorization,upload("image"),async(req,res)=>{
    try{
        let product= await Product.findById(req.params.id);

        fs.unlink(product.image,function(err){
            if(err) throw err;
            console.log("File Deleted!");
        });

        product= await Product.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            description: req.body.description,
            image: req.file.path,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            user_id: req.body.user_id,
        },{new:true});
        res.status(200).send(product);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.delete("/:id",authentication,productAuthorization,async(req,res)=>{
    try{
        let product= await Product.findById(req.params.id);

        fs.unlink(product.image,function(err){
            if(err) throw err;
            console.log("File Deleted!");
        })

        product= await Product.findByIdAndDelete(req.params.id);
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