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
        let page= req.query.page || 1;
        let size= req.query.size || await Product.find().countDocuments();
        const totalPages= Math.ceil((await Product.find().countDocuments())/size);

        const product= await Product.find().populate("user_id",{businessName:1}).skip((page-1)*size).limit(size).lean().exec();
        product.sort((a,b)=>a._id-b._id);
        res.status(200).send({product,totalPages});
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("/category/:cat",async(req,res)=>{
    try{
        let page= req.query.page || 1;
        let size= req.query.size || await Product.find({category:req.params.cat}).countDocuments();
        const totalPages= Math.ceil((await Product.find({category:req.params.cat}).countDocuments())/size);

        const product= await Product.find({category:req.params.cat}).populate("user_id",{businessName:1}).skip((page-1)*size).limit(size).lean().exec();

        res.status(200).send({product,totalPages});
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("/seller",authentication,async(req,res)=>{
    try{
        let id= req.user._id;
        let page= req.query.page || 1;
        let size= req.query.size || await Product.find().countDocuments();
        const totalPages= Math.ceil((await Product.find().countDocuments())/size);

        const product= await Product.find({user_id:id}).skip((page-1)*size).limit(size).lean().exec();

        res.status(200).send({product,totalPages});
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const product= await Product.findById(req.params.id).populate("user_id",{businessName:1}).lean().exec();
        res.status(200).send(product);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

module.exports= router;