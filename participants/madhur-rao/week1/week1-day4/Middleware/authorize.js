const AppError = require("../utils/appError");

const authorize = (...allowedRoles) => {
    return (req,res,next) => {
        console.log(allowedRoles.includes(req.user.role));
        

        if(!req.user){
            return next(new AppError("Unauthorized access",401));
        }

        if(!allowedRoles.includes(req.user.role)){
            return next(new AppError("Forbidden: Insufficient Permissions",403));
        }
        next();
    };
};
module.exports = authorize;