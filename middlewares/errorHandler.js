const errorHandler = (err, req, res, next) => { 
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};
module.exports = errorHandler;

//not using the next because we are handling the error here and sending a response to the client.  we dont want the  flow to go to the controller.. if there is error