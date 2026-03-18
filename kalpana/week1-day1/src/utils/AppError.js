class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.name = 'AppError'; // Added to identify the error type
        this.isOperational = true; // Added to distinguish operational errors from programming errors

        // Maintains proper stack trace (important for debugging)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;