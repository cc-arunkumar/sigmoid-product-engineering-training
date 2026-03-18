const {errorResponse} = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
    //log full error details
    console.error("Error details:", {
        message: err.message,
        stack: err.stack,
        status: err.status
    });

    //extract safe values for response
    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";


    //validate incoming error object
    if(err && typeof err === "object"){
        if(typeof err.status === "number"){
            statusCode = err.status;
        }
        if(typeof err.message === "string"){
            message = err.message;
        }
    }

    //send standardised error response
    errorResponse(res, message, statusCode);
};


module.exports = errorHandler;