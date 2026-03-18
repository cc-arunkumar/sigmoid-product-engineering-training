class AppError extends Error {


        constructor(message, statusCode) {

        super(message);


        this.statusCode = statusCode;


        // Maintains proper stack trace (important for debugging)

        Error.captureStackTrace(this, this.constructor);

}

}


module.exports = AppError