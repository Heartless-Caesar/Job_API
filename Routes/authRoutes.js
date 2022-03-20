const express = require("express");
const router = express.Router();
const { login, register } = require("../Controllers/controllers");

router("/login", login);

router("/register", register);

module.exports = router;
