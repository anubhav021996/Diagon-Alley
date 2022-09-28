const mongoose= require("mongoose");

const productSchema= new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    category: {type: String, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
},{
    timestamps: true,
    versionKey: false
});

module.exports= mongoose.model("products",productSchema);