const AppError = require("../utils/appError");

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        //1. Ensure user exists (set by authMiddleware)
        if (!req.user) {
            return next(new AppError("Unauthorized. User not found.", 401));
        }

    //2. Check role
    if(!allowedRoles.includes(req.user.role)){
        return next(new AppError("Forbidden. You do not have access to this resource.", 403));
    }

    next();
  };
}
module.exports = authorize;