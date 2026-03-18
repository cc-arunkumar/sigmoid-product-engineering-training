const { errorResponse } = require("../utils/apiResponse");


const errorHandler = (err, req, res, next) => {


    // 1. Log full error for debugging

    console.error("ERROR:", {

        message: err?.message,

        statusCode: err?.statusCode,

        stack: err?.stack

    });


    // 2. Extract safe values

    let statusCode = 500;

    let message = "Internal Server Error";


    // 3. Validate incoming error object

    if (err && typeof err === "object") {


        if (typeof err.statusCode === "number") {

            statusCode = err.statusCode;

        }


        if (typeof err.message === "string" && err.message.trim() !== "") {

            message = err.message;

        }

    }


    // 4. Send standardized response

    return errorResponse(res, message, statusCode);

};


module.exports = errorHandler