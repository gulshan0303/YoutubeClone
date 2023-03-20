 const User = require("../models/user")
 const bcrypt = require('bcryptjs');
const createError = require("../error");

const jwt = require('jsonwebtoken');


const signup = async(req,res,next) => {
   try {
     const {email,password} = req.body;
     // bcrypt the password

     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(password,salt);

     //create new user
     const newUser = new User({...req.body,password:hashPassword});

     // save on mongodb
     await newUser.save();
     res.status(201).json({success:true,message:"User has been created",newUser});

   } catch (error) {
     next(error)
   }
}

const signIn = async(req,res,next) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user) return next(createError(404,"User not Found!!"));
        
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch) return next(createError(400,'Wrong Credentials!!'));
 
        const {password , ...others} = user._doc;

        const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1h'});

        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json({success:true,message:"Login Success!!",user:others})

    } catch (error) {
        next(error)
    }
}

module.exports = {signup,signIn}