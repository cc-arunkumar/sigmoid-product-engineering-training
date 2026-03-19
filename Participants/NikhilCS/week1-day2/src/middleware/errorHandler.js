const {errorResponse}=require("../utils/apiResponse")
const errorHandler=(err,req,res,next)=>{
    // console.error(err.stack)
    // const statusCode=err.statusCode || 500

    console.error("ERROR:", {
        message: err?.message,
        statusCode: err?.statusCode,
        stack: err?.stack

    })
    let statusCode=500;
    let message="Internal Server Error"
    if(err && typeof err==="object"){
        if(typeof err.statusCode==="number") statusCode=err.statusCode
        if(typeof err.message==="string") message=err.message
        return errorResponse(res, message, statusCode)
    }
    res.status(statusCode).json({
        success:false,
        message:err.messsage || "Internal Server Error"
    })
};
module.exports=errorHandler;