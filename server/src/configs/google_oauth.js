const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport= require("passport");
require("dotenv").config();
const {v4: uuidv4}= require("uuid");

const User= require("../models/user.model");

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2548/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const{given_name,family_name,email,picture}= profile;
    let user= await User.findOne({email:email}).lean().exec();
    
    if(!user){
        user= await User.create({
            firstName: given_name,
            lastName: family_name,
            avatar: picture,
            email: email,
            password: uuidv4(),
            type: "user"  
        });
    }
    
    return done(null, user);
  }
));

module.exports= passport;