const createError = require("../error");
const Comment = require("../models/comments");
const Video = require("../models/video");

//add comment
const addCommet = async(req,res,next) => {
    const newComment = new Comment({userId:req.user.id,...req.body})
     try {
        const savedComment = await newComment.save();
        res.status(201).json({success:true,savedComment});
     } catch (error) {
        next(error)
     }
}


//delete comment
const deleteCommet = async(req,res,next) => {
    try {
       const comment = await Comment.findById(req.params.id);
       const video = await Video.findById(req.params.id);

       if(req.user.id === comment.userId || req.user.id ===video.userId){
         await Comment.findByIdAndDelete(req.params.id);
         res.status(200).json({success:true,message:"The comment has been deleted!!"})
       }else{
        return next(createError(403,"you can delete only your account"));
       }
    } catch (error) {
       next(error)
    }
}


//get comment
const getCommet = async(req,res,next) => {
    try {
       const comments = await Comment.find({videoId:req.params.videoId});

       res.status(200).json({success:true,comments})
    } catch (error) {
       next(error)
    }
}

module.exports = {addCommet,getCommet,deleteCommet};