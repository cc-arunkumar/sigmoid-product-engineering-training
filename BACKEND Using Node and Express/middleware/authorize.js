const AppError = require("../utils/appError");

const authorize = (...allowedRoles) => {
    return (req, res, next) => {

        // Ensure user exists (set by protect middleware)
        if(!req.user){
            return next(new AppError("Unauthorised access"), 401);
        }

        // Check roles
        if(!allowedRoles.includes(req.user.role)){
            return next(new AppError("Forbidden: insufficient permissions"), 403);
        }

        next();
    }
};

module.exports = authorize;
