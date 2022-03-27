const JWT = require("jsonwebtoken");
const Unauthorized = require("./unauthorized");
require("dotenv").config();

const jwtAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthorized("No auth header");
    }

    const token = authHeader.split(" ")[1];

    try {
        const paylaod = JWT.verify(token, process.env.JWT_Secret);
    } catch (error) {}
};
