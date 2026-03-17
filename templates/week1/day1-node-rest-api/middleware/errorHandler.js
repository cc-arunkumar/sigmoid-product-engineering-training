const errorHandler = (err, req, res, next) =>{
    console.error("errors found:", err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success : false,
        message: err.message
    });
};

module.exports = errorHandler;
