const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");


const protect = (req, res, next) => {
    try {
        let token;

        // 1. Extract token from Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // 2. If no token
        if (!token) {
            return next(new AppError("Access denied. No token provided", 401));
        }

        // 3. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "mysecretkey"
        );

        // 4. Attach user info to request
        req.user = decoded;

        next();
    } catch (error) {
        // Handle JWT specific errors
        if (error.name === "JsonWebTokenError") {
            return next(new AppError("Invalid token", 401));
        }

        if (error.name === "TokenExpiredError") {
            return next(new AppError("Token expired", 401));
        }

        return next(new AppError("Authentication failed", 401));
    }
};

module.exports = protect;