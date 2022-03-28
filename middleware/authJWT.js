const Unauthorized = require("./unauthorized");
const User = require("../Schemas/userSchema");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const jwtAuth = async (req, res, next) => {
    //FINDS HEADER WITH TOKEN
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new Unauthorized("No auth header");
    }

    const token = authHeader.split(" ")[1];

    try {
        //VERIFIES THE TOKEN ASSOCIATED TO A USER ID
        const payload = JWT.verify(token, process.env.JWT_Secret);

        //PASSING USER DATA TO A HEADER ONCE LOGIN IS SUCCESSFUL
        req.user = { userId: payload._id, name: payload.username };
        console.log(req.user);
        //PASSES TO NEXT MIDDLEWARE
        next();
    } catch (error) {
        console.log(error);
        throw new Unauthorized("Authentication invalid");
    }
};

module.exports = jwtAuth;
