const errorHandler= (err, req, res, next)=>{

    console.error(err.stack);

    const statuscode= err.statuscode || 500;

    res.status(statusCode).json({
        success:false,
        message : err.message || "Internal Server Error"
    })
}

module.exports= errorHandler;