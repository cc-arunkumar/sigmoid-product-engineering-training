const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const protect = (req, res, next) => {

    try{
        let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return next(new AppError("Access denied, no token provided", 401));
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "mysecretkey"
    );

    req.user = decoded;
    
    next();
    }
    catch(error) {
        if(error.name === "JsonWebTokenError") {
            return next(new AppError("Invalid token", 401));
        }
        if(error.name === "TokenExpiredError") {
            return next(new AppError("Token expired", 401));
        }
        return next(new AppError(error.message || "Authentication failed", 500));
    }
};

module.exports = protect;

