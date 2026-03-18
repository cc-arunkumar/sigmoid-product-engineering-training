const { errorResponse } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
    // 1. Log full error for debugging
    console.error("ERROR:", {
        message: err?.message,
        statusCode: err?.statusCode,
        stack: err?.stack
    });

    // 2. Set default values
    let statusCode = 500;
    let message = "Internal Server Error";

    // 3. Validate and extract incoming error data
    if (err && typeof err === "object") {
        if (typeof err.statusCode === "number") {
            statusCode = err.statusCode;
        }

        if (typeof err.message === "string" && err.message.trim() !== "") {
            message = err.message;
        }
    }

    // 4. Send standardized response using your utility
    return errorResponse(res, message, statusCode);
};

module.exports = errorHandler;