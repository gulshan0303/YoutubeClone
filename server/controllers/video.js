
const Video = require("../models/video");
const User = require("../models/user");
const createError = require('../error');
//create a video
const createVideo = async(req,res,next) => {
    const newVideo = new Video({userId:req.user.id,...req.body});
    try {
        const savedVideo = await newVideo.save();
        res.status(201).json({success:true,message:"video has been created!!", savedVideo});
    } catch (error) {
       next(error)
    }
}

//delete a video
const deleteVideo = async(req,res,next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found!!"));

        if(req.user.id === req.params.id){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json({success:true,message:"the video is deleted"});
        }else{
            return next(createError(403,"you can delete only your account"));
        }
    } catch (error) {
       next(error)
    }
}

//update a video
const updateVideo = async(req,res,next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found!!"));

        if(req.user.id === req.params.id){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json({success:true,message:"Video Updated!!",updateVideo});
        }else{
            return next(createError(403,"you can update only your account"));
        }
    } catch (error) {
       next(error)
    }
}

//create a video
const getVideo = async(req,res,next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json({success:true,video})
    } catch (error) {
       next(error)
    }
}


const addView = async(req,res,next) => {
    try {
    await Video.findByIdAndUpdate(req.params.id,{
        $inc:{views:1}
    });
        res.status(200).json({success:true,message:"the view has been increased"})
    } catch (error) {
       next(error)
    }
}
const trendVideo = async(req,res,next) => {
    try {
        const videos = await Video.find().sort({views:-1});
        res.status(200).json({success:true,videos})
    } catch (error) {
       next(error)
    }
}

const randomVideo = async(req,res,next) => {
    try {
        const videos = await Video.aggregate([{$sample: {size:40}}]);
        res.status(200).json({success:true,videos})
    } catch (error) {
       next(error)
    }
}


const subVideo = async(req,res,next) => {
    try {
       const user = await User.findById(req.user.id);

       const subscribedChannels = user.subscribedUser;

       const list = Promise.all(
        subscribedChannels.map(channelId => {
            return Video.find({userId:channelId})
          })
       );
       res.status(200).json({success:true,list})
    } catch (error) {
       next(error)
    }
}


module.exports = {createVideo,getVideo,deleteVideo,updateVideo,addView,randomVideo,trendVideo,subVideo};