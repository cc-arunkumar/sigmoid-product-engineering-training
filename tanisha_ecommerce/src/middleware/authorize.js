const AppError = require("../utils/AppError");

const authorize = (...allowedRoles) => {
    return (req, res, next) => {

        const { role } = req.user;

        if(!role){
            return next(new AppError("unaotherized access !!", 401));
        }

        if (!allowedRoles.includes(role)) {
            return next(new AppError("You are not authorized to perform this action !!", 403));
        }

        next();
    };
};

module.exports = authorize;