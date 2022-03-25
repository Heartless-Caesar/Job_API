const BadRequest = require("../middleware/BadRequest");
const Unauthorized = require("../middleware/unauthorized");
const { StatusCodes } = require("http-status-codes");
const UserSchema = require("../Schemas/userSchema");
require("dotenv").config();

//LOGIN
const login = async (req, res) => {
    //LOGIN CREDENTIALS
    const { username, password } = req.body;

    //ERROR IF MISSING CREDENTIAL
    if (!username || !password) {
        throw new BadRequest("Please provide the missing credential");
    }

    //FINDS USER IN DB
    const dbUser = await UserSchema.findOne({ username });

    //ERROR IF THERE IS NO SUCH USER
    if (!dbUser) {
        throw new Unauthorized("Invalid credentials");
    }

    //SIGNS A NEW TOKEN FOR THE LOGGED USER
    const token = dbUser.createJWT();

    res.status(StatusCodes.OK).json({
        message: `Token for user ${username} signed`,
    });
};

//REGISTRATION
const register = async (req, res) => {
    //GETS REQUEST BODY FROM SCHEMA ELEMENTS
    const user = await UserSchema.create({ ...req.body });

    //METHOD EXECUTED TO ASSIGN 30 DAY TOKEN
    const token = user.createJWT();

    //SUCESSFULL OPERATIONS
    res.status(StatusCodes.CREATED).json({ msg: `User ${user}`, token: token });
};

module.exports = { login, register };
