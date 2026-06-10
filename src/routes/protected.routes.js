const express = require('express');
const protectedController = require('../controllers/protected.controller');
const auth = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');
const router = express.Router();
//middleware auth
router.get('/welcome', [auth], asyncHandler(protectedController.welcome))
router.get('/account-summary', [auth], asyncHandler(protectedController.accountSummary))
module.exports = router