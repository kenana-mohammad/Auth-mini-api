const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');
const { LoginLimiter, SignupLimiter } = require('../middlewares/limiter');
const { registerValidate, loginValidate } = require('../validation/auth.validate');

const router = express.Router();
//
router.post('/signup', [SignupLimiter, ...registerValidate], asyncHandler(authController.register))
router.post('/login', [LoginLimiter, ...loginValidate], asyncHandler(authController.login))
    //logout
router.post('/logout', [auth], asyncHandler(authController.logout))
    //get my profile
router.get('/profile', [auth], asyncHandler(authController.profile))

module.exports = router