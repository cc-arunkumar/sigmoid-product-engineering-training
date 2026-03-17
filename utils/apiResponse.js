const sucessResponse = (res,data, message = "Success",statusCode=200) => {
    return res.status(statusCode).json({
        success: true,
        message:message,
        data:data
    });
};

const errorResponse = (res, message = "Error", statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message:message,
    });
};

export { sucessResponse, errorResponse };