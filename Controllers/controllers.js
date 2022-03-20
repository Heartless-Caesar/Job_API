const UserSchema = require("../Schemas/userSchema");
const JWT = require("jsonwebtoken");
const { BadRequest } = require("../middleware/BadRequest");
require("dotenv").config();

//LOGIN
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequest("Please provide the missing credential");
    }
    const dbUser = UserSchema.findOne({ username: username });

    const token = JWT.sign(dbUser, process.env.JWT_Secret);

    res.status(201).json({ message: `Token for user ${username} signed` });
};

//GET ALL
const getAllJobs = async (req, res) => {
    res.status(201).send("Get all jobs");
};

//GET SINGLE
const getJob = async (req, res) => {
    res.status(201).send("Get single job");
};

//CREATE
const createJob = async (req, res) => {
    res.status(201).send("Create job");
};

//UPDATE
const updateJob = async (req, res) => {
    res.status(201).send("Update job");
};

//DELETE
const deleteJob = async (req, res) => {
    res.status(201).send("Delete job");
};

module.exports = { login, getAllJobs, getJob, createJob, updateJob, deleteJob };
