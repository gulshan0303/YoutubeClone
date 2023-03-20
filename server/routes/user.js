const express = require('express');
const { updateUser, getUser, deleteUser, subscribeUser, like, unsubscribeUser, dislike } = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

//update
router.put("/:id",verifyToken, updateUser);

//delete
router.delete("/:id",verifyToken,deleteUser);

//get
router.get("/find/:id",getUser)

//subscribe
router.put("/sub/:id", verifyToken,subscribeUser);

//unsubscribe
router.put("/unsub/:id",verifyToken,unsubscribeUser);

//like a video
router.put("/like/:videoId",verifyToken,like);

//dislike a video
router.put("/dislike/:videoId",verifyToken,dislike);



module.exports = router