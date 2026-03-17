const errorHandler=(err,req,res,next)=>{
    console.error(err.stack);
    const statusCode=err.statusCode || 500;
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
}
export default errorHandler;