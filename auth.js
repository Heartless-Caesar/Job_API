const { Unauthorized } = require("./middleware/unauthorized");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthorized("No authorization header");
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = JWT.verify(token, process.env.JWT_Secret);

        const { _id, username } = user;

        req.user = { _id, username };

        next();
    } catch (error) {
        console.log(req.headers);
        throw new Unauthorized("Something went wrong in the verification...");
    }
    next();
};
