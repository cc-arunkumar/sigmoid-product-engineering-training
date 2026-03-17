const errorHandler= (err, req, res, next)=>{

    console.error(error.stack);

    const statuscode= err.statuscode || 500;

    res.status(statuscode).json({
        success:false,
        message : err.message || "Internal Server Error"
    })
}

module.exports= errorHandler;