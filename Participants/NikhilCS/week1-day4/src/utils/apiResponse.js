exports.successResponse = (res, data, message, statuscode=200) => {
    return res.status(statuscode).json({
        success: true,
        message:  message,
        data:data
    });
}
exports.errorResponse=(res,message,statusCode=500)=>{
    return res.status(statusCode).json({
        success:false,
        message:message
    })
}