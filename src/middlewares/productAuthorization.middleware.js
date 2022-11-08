const Product= require("../models/product.model");

module.exports= async(req,res,next) => {
    const user= req.user;
    const product= await Product.findById(req.params.id).lean().exec();

    let isPermitted= false;
    
    try{
        if(user.type==="seller" && user._id==product.user_id) isPermitted= true;
        if(!isPermitted) return res.status(403).send("Permission denied");
        next();
    }
    catch(e){
        
    }
}