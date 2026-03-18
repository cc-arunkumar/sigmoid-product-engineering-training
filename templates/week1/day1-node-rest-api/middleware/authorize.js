const  AppError = require("../utils/AppError");

const authorize = (...allowerdRoles) => {
    return(req, res, next) => {
        if(!req.user){
            return next(new AppError("Unauthorized access", 401));
        }

        if(!allowerdRoles.includes(req.user.role)){
            return next(new AppError("Forbidden: insufficient permissions", 403));
        }

        next();
    };
};

module.exports = authorize;