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

    //ID NOT FOUND ERROR HANDLER
    if (!singleJob) {
        throw new NotFoundError(`No element with id of ${jobId}`);
    }

    res.status(201).json({ singleJob });
};

//CREATE
const createJob = async (req, res) => {
    //DYNAMICALLY SETS THE LOGGED USER AS THE AUTHOR OF THE JOB
    req.body.createdBy = req.user._id;

    //CREATES ELEMENT
    const companyDB = await jobSchema.create(req.body);

    res.status(StatusCodes.CREATED).json({ companyDB });
};

//UPDATE
const updateJob = async (req, res) => {
    //DESTRUCTURE THE REQUEST BODY FOR INPUT, USER ID FOR SPECIFIC FILTERING AND PARAMS FOR ELEMENT ID
    const {
        body: { company, position },
        user: { _id },
        params: { id: jobId },
    } = req;
    console.log(req.user);
    //ERROR IN CASE OF MISSING FIELDS
    if (company == "" || position == "") {
        throw new BadRequest("Please provide both company and position fields");
    }

    //ELEMENT TO BE UPDATED
    const dbUpdate = await jobSchema.findOneAndUpdate(
        { _id: jobId, createdBy: _id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(StatusCodes.OK).json({ dbUpdate });
};

//DELETE
const deleteJob = async (req, res) => {
    const {
        params: { id: jobId },
        user: { userId: _id },
    } = req;

    const deleteJob = await jobSchema.findByIdAndDelete({
        _id: jobId,
        createdBy: _id,
    });

    if (!deleteJob) {
        throw new NotFoundError(`No element with and ID of ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted job", deleted: deleteJob });
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
