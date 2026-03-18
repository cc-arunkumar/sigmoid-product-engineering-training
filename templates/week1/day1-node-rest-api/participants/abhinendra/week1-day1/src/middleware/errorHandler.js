const { errorResponse } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return errorResponse(res, message, statusCode);
};

module.exports = errorHandler;