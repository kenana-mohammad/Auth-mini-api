const express = require('express');
const protectedController = require('../controllers/protected.controller');
const auth = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');
const role = require('../middlewares/role');
const router = express.Router();
const id = require('./../middlewares/id');
const isValidateId = require('../validation/user.validate');
//middleware auth
router.get('/overview', [auth, role(['admin'])], asyncHandler(protectedController.overview));
router.get('/users', [auth, role(['admin'])], asyncHandler(protectedController.getUsers));
router.delete('/users/:id', [auth, role(['admin']), ...isValidateId], asyncHandler(protectedController.remove));

module.exports = router