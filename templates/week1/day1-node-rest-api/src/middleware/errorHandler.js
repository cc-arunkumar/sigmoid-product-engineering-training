const { errorResponse } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {

   
    console.error("ERROR:", {
        message: err?.message,
        statusCode: err?.statusCode,
        stack: err?.stack
    });

    // 2. Default values
    let statusCode = 500;
    let message = "Internal Server Error";

   
    if (err && typeof err === "object") {

        if (typeof err.statusCode === "number") {
            statusCode = err.statusCode;
        }

        if (typeof err.message === "string" && err.message.trim() !== "") {
            message = err.message;
        }
    }

    
    return errorResponse(res, message, statusCode);
};

module.exports = errorHandler;