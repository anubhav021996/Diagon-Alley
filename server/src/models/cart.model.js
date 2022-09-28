const mongoose= require("mongoose");

const cartSchema= new mongoose.Schema({
    product_id: [{type: mongoose.Schema.Types.ObjectId, ref: "products", required: false}],
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:"users", requires: true}
});

module.exports= mongoose.model("carts",cartSchema);