const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    password: {
        type: Number,
        required: [true, "Please provide a password"],
    },
});

module.exports = mongoose.model("user", UserSchema);
