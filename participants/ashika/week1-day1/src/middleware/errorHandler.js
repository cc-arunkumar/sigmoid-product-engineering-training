// const errorhandler=(err, req, res, next)=>{

//     console.error(err.stack);

//     const statuscode=err.statuscode||500

//     res.status(statuscode).json({
//         message:err.message || "internal server error"
//     })
// }


// module.exports=errorhandler;

const { errorResponse } = require("../utils/apiresponses");

const errorhandler = (err, req, res, next) => {

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

module.exports = errorhandler;
