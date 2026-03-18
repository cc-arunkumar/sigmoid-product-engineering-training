

const logger = (req, res, next) => {

    const method = req.method;
    const url = req.url;

    const time = new Date();

    console.log("printing logger")
    const print = `method: ${method} , url : ${url} , time : ${time}`;
    console.log(print);
    // res.json(print) ; 


    next();
}
const validation = (req, res, next) => {

    const { name, price, brand } = req.body;

    console.log("validation called");

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product name must be a non-empty string"
        });
    }

    // PRICE
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be a number greater than 0"
        });
    }

    // CATEGORY
    if (typeof brand !== "string" || brand.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category must be a non-empty string"
        });
    }

    next();
}




// const errorHandler = (err, req, res, next) => {
//     console.log("error is calling")
//     console.error(err.stack);
//     const statusCode = err.statusCode || 500;

//     res.status(statusCode).json({
//         success: false,
//         message: err.message || "Internal Server Error"
//     });

// };




const { errorResponse } = require("../utils/apiresponce");

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

// module.exports = errorHandler;

module.exports = {
    logger,
    validation,
    errorHandler
}