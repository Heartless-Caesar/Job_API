const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const authenticateUser = require("./middleware/authJWT");
const { authRouter } = require("./Routes/authRoutes");
const { jobRouter } = require("./Routes/jobRoutes");
const notFound = require("./middleware/notFound");
const connectDB = require("./connect");
const express = require("express");
require("express-async-errors");
const app = express();
const port = 5000;

//JSON PARSING
app.use(express.json());

//CUSTOM ERROR, VALIDATION ERROR, DUPLICATION ERROR HANDLER
app.use(errorHandlerMiddleware);

//LOGIN AND REGISTER ROUTES
app.use("/app/auth", authRouter);

/*APPLIES THE JWT AUTH SO A USER CAN ONLY VIEW
THE DATA ASSOCIATED TO THEIR TOKEN AND ACCOUNT*/
app.use("/app/jobs", authenticateUser, jobRouter);

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
