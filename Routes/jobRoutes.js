const express = require("express");
const router = express.Router();
const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} = require("../Controllers/controllers");

router.Route("/").post(createJob).get(getAllJobs);
router.Route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
