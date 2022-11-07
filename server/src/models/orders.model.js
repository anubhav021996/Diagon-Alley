const mongoose= require("mongoose");

const orderSchema= new mongoose.Schema({
    product_id: [{type: mongoose.Schema.Types.ObjectId, ref:"products", required: true}],
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:"users", required: true},
    address: {type: String, required: true},
    paymentId: {type: String, required: true},
    amount: {type: Number, required: true},
    orderId: {type: String, required: true},
},{
    timestamps: true,
    versionKey: false
});

module.exports= mongoose.model("orders",orderSchema);