const authRouter = require("./Routes/authRoutes");
const jobRouter = require("./Routes/jobRoutes");
const connectDB = require("./connect");
const express = require("express");
const app = express();
const port = 5000;

//JSONPARSING
app.use(express.json());

//ROUTES
app.use("/auth", authRouter);
app.use("/jobs", jobRouter);

const start = async (req, res) => {
    try {
        await connectDB;
        app.listen(() => {
            `Connected to port ${port}`;
        });
    } catch (error) {
        console.log(error);
    }
};

start();
