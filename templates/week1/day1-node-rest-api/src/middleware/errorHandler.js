import { errorResponse } from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
    //1. log full error for debugging
    console.error("ERROR:", {
        message: err?.message,
        statusCode: err?.statusCode,
        stack: err?.stack
    });
    // 2. extract safe values
    let statusCode = 500;
    let message = "Internal Server Error";
    // 3. Validate coming error object
    if (err && typeof err === "object") {
        if (typeof err.statusCode === "number") {
            statusCode = err.statusCode;
        }

        if (typeof err.message === "string" && err.message.trim() !== "") {
            message = err.message;
        }
    }
    //4.  send standardized response
    return errorResponse(res, message, statusCode);
};

export default errorHandler;