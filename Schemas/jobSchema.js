const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Please input a company name"],
            maxlength: 50,
        },
        position: {
            type: String,
            required: [true, "Please input a position"],
            maxlength: 50,
        },
        status: {
            type: String,
            required: [true, "Job schema needs a company"],
            enum: ["interviewing", "declined", "pending"],
            default: "pending",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, "Provide a user"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("jobs", JobSchema);
