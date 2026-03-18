exports.successResponse = (res, data, message, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        data,
        message
    });
};

exports.errorResponse=(res,message,statusCode=500)=>{
    return res.status(statusCode).json({
        success:false,
        message:message
    });
};
