const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        minlength: 3,
        maxlength: 30,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
});

//WILL HASH THE PASSWORD WHEN A USER CREATES THEIR ACCOUNT
UserSchema.pre("save", async function () {
    //GENERATES NUMBER OF RANDOM BYTES
    const salt = await bcrypt.genSalt(10);

    //HASHES THE PASSWORD BASED ON THE GENERATED SALT
    this.password = await bcrypt.hash(this.password, salt);
});

//SIGNS WEB TOKEN
UserSchema.methods.createJWT = function () {
    return JWT.sign(
        { userID: this._id, user: this.username },
        process.env.JWT_Secret,
        { expiresIn: "30d" }
    );
};

module.exports = mongoose.model("user", UserSchema);
