const mongoose= require("mongoose");

const orderSchema= new mongoose.Schema({
    product_id: [{type: mongoose.Schema.Types.ObjectId, ref:"products", required: false}],
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:"users", required: true}
});

module.exports= mongoose.model("orders",orderSchema);