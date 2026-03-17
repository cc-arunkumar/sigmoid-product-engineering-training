exports.successResponse =(res,message, data, statusCode=200)=>{
    return res.status(statusCode).json({
        sucess:true,
        message:message,
        data:data

    });
}