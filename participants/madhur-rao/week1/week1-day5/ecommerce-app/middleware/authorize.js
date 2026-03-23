const AppError = require("../utils/AppError");
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // 1. Ensure user exists (set by protect middleware)
        if (!req.user) {
            return next(new AppError("Unauthorized access", 401));
        }
        // 2. Check role
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("Forbidden: insufficient permissions", 403));
        }
        next();
    };
};
module.exports = authorize;