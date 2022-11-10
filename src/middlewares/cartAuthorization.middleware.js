const Cart= require("../models/cart.model");

module.exports= async(req,res,next) => {
    let user= req.user;
    const cart= await Cart.findById(req.params.id).lean().exec();
    let isPermitted= false;

    try{
        if(user._id==cart.user_id) isPermitted= true;
        if(!isPermitted) return res.status(403).send("Permission Denied");
        next();
    }
    catch(e){

    }
}