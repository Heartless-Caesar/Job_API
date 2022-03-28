const { BadRequest } = require("../middleware/BadRequest");
const jobSchema = require("../Schemas/jobSchema");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

//GET ALL
const getAllJobs = async (req, res) => {
    const allJobs = await jobSchema
        .find({ createdBy: req.user._id })
        .sort("createdAt");
    res.status(StatusCodes.OK).json({ jobs: allJobs });
};

//GET SINGLE
const getJob = async (req, res) => {
    res.status(201).send("Get single job");
};

//CREATE
const createJob = async (req, res) => {
    req.body.createdBy = req.user._id;

    const companyDB = await jobSchema.create(req.body);

    res.status(StatusCodes.CREATED).json({ companyDB });
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
