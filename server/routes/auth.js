const express = require('express');
const { signup, signIn } = require('../controllers/auth');

const router = express.Router();

//create a user
router.post('/signup',signup);
//sign up user
router.post('/signin',signIn);
//sign up with google
router.post('/google',)

module.exports = router