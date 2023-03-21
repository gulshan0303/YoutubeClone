const express = require('express');
const { createVideo, deleteVideo, updateVideo, getVideo, addView, trendVideo, randomVideo, subVideo, tagsVideo, searchVideo } = require('../controllers/video');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();


//create a video
router.post("/",verifyToken, createVideo)
//delete 
router.delete("/:id",verifyToken, deleteVideo)
//update
router.put("/:id",verifyToken, updateVideo)
//get
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trendVideo)
router.get("/random", randomVideo)
router.get("/sub",verifyToken, subVideo)
router.get("/tags", tagsVideo)
router.get("/search", searchVideo)


module.exports = router