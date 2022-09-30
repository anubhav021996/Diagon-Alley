const mongoose= require("mongoose");
const bcrypt= require("bcryptjs");

const userSchema= new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    avatar: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true, default:"user"},
    businessName: {type: String, required: false},
    businessAddress: {type: String, required: false},
    gstNumber: {type: String, required: false},
    accountNumber: {type: Number, required: false},
    ifscCode: {type: String, required: false},
    accountHolderName: {type: String, required: false},
    bankName: {type: String, required: false},
},{
    timestamps: true,
    versionKey: false
});

userSchema.pre("save",function(next){
    this.password= bcrypt.hashSync(this.password,8);
    next();
});

userSchema.methods.checkPassword= function(password){
    return bcrypt.compareSync(password,this.password)
};

module.exports= mongoose.model("users",userSchema);