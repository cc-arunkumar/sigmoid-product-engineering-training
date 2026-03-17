const errorHandler = (err,req,res,next) => {

    console.error(err.stack);//for keeping logs of the error for frontend ui 

    const statusCode = err.statusCode || 500;//log the err status code or 500 default

    res.status(statusCode).json({
        success: false,
        message: "Internal server issue"
    });

}
module.exports=errorHandler;