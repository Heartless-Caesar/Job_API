const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    name: {
        type: string,
        required: [true, "Job needs a name"],
    },
});

module.exports = mongoose.model("jobs", JobSchema);
