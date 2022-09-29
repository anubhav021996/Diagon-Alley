const mongoose= require("mongoose");
const bcrypt= require("bcryptjs");

const userSchema= new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    dateOfBirth: {type: Date, required:true},
    gender: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
},{
    timestamps: true,
    versionKey: false
});

userSchema.pre("save",function(next){
    if(!this.isModified("password")) return next();

    this.password= bcrypt.hashSync(this.password,8);
    return next();
});

userSchema.methods.checkPassword= function(password){
    return bcrypt.compareSync(password,this.password)
};

module.exports= mongoose.model("users",userSchema);