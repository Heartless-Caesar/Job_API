const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    password: {
        type: number,
        required: [true, "Please provide a password"],
    },
});

module.exports = mongoose.model("user", UserSchema);
