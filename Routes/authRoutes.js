const express = require("express");
const router = express.Router();
const { login, register } = require("../Controllers/authControllers");

router.post("/login", login);

router.get("/register", register);

module.exports = router;
