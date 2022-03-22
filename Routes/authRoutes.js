const express = require("express");
const authRouter = express.Router();
const { login, register } = require("../Controllers/authControllers");

authRouter.route("/login").post(login);

authRouter.route("/register").get(register);

module.exports = authRouter;
