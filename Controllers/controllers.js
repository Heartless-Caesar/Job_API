const { BadRequest } = require("../middleware/BadRequest");
const UserSchema = require("../Schemas/userSchema");
const JWT = require("jsonwebtoken");
require("dotenv").config();

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

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
