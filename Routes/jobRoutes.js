const express = require("express");
const jobRouter = express.Router();
const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} = require("../Controllers/controllers");

jobRouter.route("/").post(createJob).get(getAllJobs);
jobRouter.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobRouter;
