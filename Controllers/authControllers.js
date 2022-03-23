const BadRequest = require("../middleware/BadRequest");
const { StatusCodes } = require("http-status-codes");
const UserSchema = require("../Schemas/userSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//LOGIN
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequest("Please provide the missing credential");
    }
    const dbUser = await UserSchema.findOne({ username: username });

    const token = JWT.sign(dbUser, process.env.JWT_Secret);

    res.status(201).json({ message: `Token for user ${username} signed` });
};

//REGISTRATION
const register = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        throw new BadRequest("Please provide valid credentials");
    }
    const user = await UserSchema.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({ msg: "User registered" });
};

module.exports = { login, register };
