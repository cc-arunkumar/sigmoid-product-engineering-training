const AppError = require("../utils/AppError");

const authorize = (...allowedRoles) => {
    return (req, res, next) => {

        // 1. Check if user exists (set by protect middleware)
        if (!req.user) {
            return next(new AppError("Unauthorized access", 401));
        }

        // 2. Check if user role is allowed
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return next(
                new AppError("Forbidden: insufficient permissions", 403)
            );
        }

        // 3. If everything is fine, move to next middleware
        next();
    };
};

module.exports = authorize;