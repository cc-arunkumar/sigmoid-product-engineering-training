class AppResponse{
    constructor(res,message,data,statusCode=200){
        return res.status(statusCode).json({
            success:true,
            message:message,
            data:data
        });
    }
}
module.exports=AppResponse;