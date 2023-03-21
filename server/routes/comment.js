const express = require('express');
const { getCommet, addCommet, deleteCommet } = require('../controllers/comment');
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/:videoId", getCommet)
router.post("/",verifyToken, addCommet)
router.delete("/:id",verifyToken, deleteCommet)

module.exports = router