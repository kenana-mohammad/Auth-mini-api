const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },

    email: {
        type: String,
        unique: [true, 'email must be is unique'],
        required: true

    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)