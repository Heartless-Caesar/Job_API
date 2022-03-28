const BadRequest = require("../middleware/BadRequest");
const Unauthorized = require("../middleware/unauthorized");
const { StatusCodes } = require("http-status-codes");
const UserSchema = require("../Schemas/userSchema");
require("dotenv").config();

//LOGIN
const login = async (req, res) => {
    //LOGIN CREDENTIALS
    const { email, password } = req.body;

    //ERROR IF MISSING CREDENTIAL
    if (!email || !password) {
        throw new BadRequest("Please provide the missing credential");
    }

    //FINDS USER IN DB
    const dbUser = await UserSchema.findOne({ email });
    console.log(dbUser);
    //ERROR IF THERE IS NO SUCH USER
    if (!dbUser) {
        throw new Unauthorized("Invalid credentials");
    }

    //SIGNS A NEW TOKEN FOR THE LOGGED USER
    const token = dbUser.createJWT();

    //COMAPRING INPUTTED PASSWORD WITH ONE IN DB
    const verifyPass = await dbUser.matchPassword(password);

    if (!verifyPass) {
        throw new Unauthorized("Passwords do not match");
    }

    res.status(StatusCodes.OK).json({
        message: `Token for user ${email} signed`,
        token: `${token}`,
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
