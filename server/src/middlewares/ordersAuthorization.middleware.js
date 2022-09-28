const Orders= require("../models/orders.model");

module.exports= async(req,res,next) => {
    let user= req.user;
    const orders= await Orders.findById(req.params.id).lean().exec();
    let isPermitted= false;

    if(user._id==orders.user_id) isPermitted= true;

    if(!isPermitted) return res.status(403).send("Permission Denied1");

    next();
}