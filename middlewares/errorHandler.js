import { errorResponse } from "../utils/apiResponse.js";
const errorHandler=(err,req,res,next)=>{
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
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
}
export default errorHandler;