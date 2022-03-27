const JWT = require("jsonwebtoken");
const Unauthorized = require("./unauthorized");
require("dotenv").config();

const jwtAuth = async (req, res, next) => {
    //FINDS HEADER WITH TOKEN
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthorized("No auth header");
    }

    const token = authHeader.split(" ")[1];

    try {
        //VERIFIES THE TOKEN ASSOCIATED TO A USER ID
        const payload = JWT.verify(token, process.env.JWT_Secret);

        //PASSING USER DATA TO A HEADER ONCE LOGIN IS SUCCESSFUL
        req.user = { id: payload._id, name: payload.username };

        next();
    } catch (error) {
        throw new Unauthorized(error.message);
    }
};

module.exports = jwtAuth;
