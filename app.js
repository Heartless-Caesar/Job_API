const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const { authRouter } = require("./Routes/authRoutes");
const notFound = require("./middleware/notFound");
const jwtAuth = require("./middleware/authJWT");
const jobRouter = require("./Routes/jobRoutes");
const connectDB = require("./connect");
const express = require("express");
require("express-async-errors");
const app = express();
const port = 5000;

//SECURITY LIBRARIES
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const { StatusCodes } = require("http-status-codes");

//APPLYING SECURITY LIBRARIES
app.use(helmet());
app.use(cors());
app.use(xss());
app.set("trust proxy", 1);
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, //TIME TO WHICH REMEMBER THE REQUESTS, CURRENT 15 MIN
        max: 100, //NUMBER OF REQUESTS PER WINDOW MS
    })
);

//JSON PARSING
app.use(express.json());

//CUSTOM ERROR, VALIDATION ERROR, DUPLICATION ERROR HANDLER
app.use(errorHandlerMiddleware);

//LOGIN AND REGISTER ROUTES
app.use("/app/auth", authRouter);

/*APPLIES THE JWT AUTH SO A USER CAN ONLY VIEW
THE DATA ASSOCIATED TO THEIR TOKEN AND ACCOUNT*/
app.use("/app/jobs", jwtAuth, jobRouter);

//TEST
app.get("/", (req, res) => {
    res.status(StatusCodes.OK).send("RESPONSE TEST JOB API");
});
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
