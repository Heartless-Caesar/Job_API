const { BadRequest } = require("../middleware/BadRequest");
const { NotFoundError } = require("../middleware/NotFoundError");
const jobSchema = require("../Schemas/jobSchema");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

//GET ALL
const getAllJobs = async (req, res) => {
    //FILTERS ACCORDING TO THE CURRENTLY LOGGED USER
    const allJobs = await jobSchema
        .find({ createdBy: req.user._id })
        .sort("createdAt");
    res.status(StatusCodes.OK).json({ jobs: allJobs });
};

//GET SINGLE
const getJob = async (req, res) => {
    //GET REQ.USER ID AND THE PARAMS ELEMENT ID
    const {
        user: { _id },
        params: { id: jobId },
    } = req;

    //FILTER TO FIND THE ELEMENT POSTED BY THE CURRENT USER
    const singleJob = await jobSchema.find({ _id: jobId, createdBy: _id });

    if (!singleJob) {
        throw new NotFoundError(`No element with id of ${jobId}`);
    }

    res.status(201).json({ singleJob });
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
