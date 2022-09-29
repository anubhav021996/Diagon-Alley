const Address= require("../models/address.model");

module.exports= async(req,res,next) => {
    let user= req.user;
    const address= await Address.findById(req.params.id).lean().exec();
    let isPermitted= false;

    if(user._id==address.user_id) isPermitted= true;

    if(!isPermitted) return res.status(403).send("Permission Denied");

    next();
}