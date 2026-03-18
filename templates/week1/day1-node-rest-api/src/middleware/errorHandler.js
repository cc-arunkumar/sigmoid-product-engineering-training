// const errorHandler = (err,req,res,next) => {

//     console.error(err.stack);//for keeping logs of the error for frontend ui 

//     const statusCode = err.statusCode || 500;//log the err status code or 500 default

//     res.status(statusCode).json({
//         success: false,
//         message: "Internal server issue"
//     });

// }
// module.exports=errorHandler;
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


module.exports = errorHandler;