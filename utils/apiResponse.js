exports.success = (res, data, message , statusCode = 200) => {
    return res.status(statusCode).json({
        success : true,
        message : message,
        data : data
    });
};

exports.errorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
        success : false,
        message : message
    });
};