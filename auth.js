const JWT = require("jsonwebtoken");
const { BadRequest } = require("./middleware/BadRequest");
const { Unauthorized } = require("./middleware/unauthorized");

const login = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthorized("No authorization header");
    }

    try {
        const user = JWT.sign({});
    } catch (error) {}
};
