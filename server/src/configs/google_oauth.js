const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport= require("passport");
require("dotenv").config();
const {v4: uuidv4}= require("uuid");

const User= require("../models/user.model");
const Address= require("../models/address.model");
const Cart= require("../models/cart.model");
const Orders= require("../models/orders.model");

const { welcomeMail, adminMail } = require('../utilis');

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2548/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    let user= await User.findOne({email:profile?.email}).lean().exec();
    
    if(!user){
        user= await User.create({
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            avatar: profile?.picture,
            email: profile?.email,
            password: uuidv4(),
            type: "user"  
        });

        const address= await Address.create({user_id:user._id});
        const cart= await Cart.create({user_id:user._id});
        const orders= await Orders.create({user_id:user._id});
        
        welcomeMail(user);
        adminMail(user);
    }
    
    return done(null, user);
  }
));

module.exports= passport;