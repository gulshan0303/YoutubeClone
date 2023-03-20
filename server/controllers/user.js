const createError = require("../error");
const User = require("../models/user");

//update user

const updateUser = async(req,res,next) => {
    if(req.params.id === req.user.id){
        try {
          const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
          },{new:true});
          res.status(200).json({success:true,message:"Update Success!!",updatedUser})
        } catch (error) {
           next(error); 
        }
    }else{
        return next(createError(403,"You can update only your account "));
    }
    
}

//delete user
const deleteUser = async(req,res,next) => {
    if(req.params.id === req.user.id){
        try {
        await User.findByIdAndDelete(req.params.id,);
          res.status(200).json({success:true,message:"user has been deleted!!"})
        } catch (error) {
           next(error); 
        }
    }else{
        return next(createError(403,"You can delete only your account "));
    }
    
}

//get a user
const getUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({success:true,message:"user has been find!!",user})
    } catch (error) {
       next(error); 
    }
}

//subscribe a user
const subscribeUser = async(req,res,next) => {
    try {
        await User.findById(req.user.id,{
            $push:{subscribedUser: req.params.id}
        });

        await User.findByIdAndUpdate(req.params.id,{$inc:{subscibers:1},})
      res.status(200).json({success:true,message:"Subscription successfull."})
    } catch (error) {
       next(error); 
    }
}

//unsubscribe a user
const unsubscribeUser = async(req,res,next) => {
    try {
        await User.findById(req.user.id,{
            $pull:{subscribedUser: req.params.id}
        });

        await User.findByIdAndUpdate(req.params.id,{$inc:{subscibers:-1},})
      res.status(200).json({success:true,message:"Unsubscription successfull."})
    } catch (error) {
       next(error); 
    }
}

//like a video
const like = (req,res,next) => {
    try {
        
    } catch (error) {
       next(error); 
    }
}

//dislike a video
const dislike = (req,res,next) => {
    try {
        
    } catch (error) {
       next(error); 
    }
}



module.exports = {updateUser,deleteUser,getUser,subscribeUser,unsubscribeUser,like,dislike}