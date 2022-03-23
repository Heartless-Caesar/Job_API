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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = { username, email, password: hashedPassword };

    const user = await UserSchema.create({ ...tempUser });

    res.status(StatusCodes.CREATED).json({ msg: `User ${user}` });
};

module.exports = { login, register };
