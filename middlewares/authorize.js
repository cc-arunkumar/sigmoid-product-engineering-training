const AppError = require("../utils/AppError")

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user){
            return next(new AppError("Unauthorized Access", 401));
        }

        if(!allowedRoles.includes(req.user.role)){
            return next(new AppError("Forbidden: insufficient permission", 403));
        }

        next();
    }
}

module.exports = authorize;