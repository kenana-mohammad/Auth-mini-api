//
const { param } = require("express-validator");
const validate = require("../middlewares/validate");

const isValidateId = [
    param('id').isMongoId().withMessage('Invalid ID format'), validate
]
module.exports = isValidateId