const { StatusCodes } = require("http-status-codes");

let errorHandlerMiddleware = (err, req, res, next) => {
    //DEFAULT ERROR
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong...",
    };

    //MODIFIES CUSTOM ERROR IF THERE'S A VALIDATION ERROR
    if (err.name === "Validation error") {
        customError.message = Object.values(err.errors)
            .map((x) => x.message)
            .join(",");
        customError.statusCode = 400;
    }

    //MODIFIES CUSTOM ERROR IF THERE'S A CASE OF DUPLICATION
    if (err.code && err.code === 11000) {
        customError.message = `Duplicate value encountered on the ${Object.keys(
            err.keyValue
        )}
        field, please choose another value`;
        customError.statusCode = 400;
    }

    //MODIFIES
    if (err.name === "CastError") {
        customError.message = `No item with an Id of ${err.value} found.`;
        customError.statusCode = 404;
    }

    return res
        .status(customError.statusCode)
        .json({ message: customError.message });
};
