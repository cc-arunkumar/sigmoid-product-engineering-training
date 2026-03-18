const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const protect = (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(new AppError("Not authorized, token missing", 401));
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");

        req.user = decoded;

        next();

    } catch (error) {
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