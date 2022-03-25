const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const { authRouter } = require("./Routes/authRoutes");
const notFound = require("./middleware/notFound");
const { jobRouter } = require("./Routes/jobRoutes");
const connectDB = require("./connect");
const express = require("express");
require("express-async-errors");
const app = express();
const port = 5000;

//JSON PARSING
app.use(express.json());

//CUSTOM ERROR, VALIDATION ERROR, DUPLICATION ERROR HANDLER
app.use(errorHandlerMiddleware);

//ROUTES
app.use("/app/auth", authRouter);
app.use("/app/jobs", jobRouter);

//404 MIDDLEWARE
app.use(notFound);

//INIT FUNCTION
const start = async () => {
    try {
        await connectDB;
        app.listen(port, () => {
            console.log(`Connected to port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
