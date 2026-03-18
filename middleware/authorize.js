
const AppError = require("../utils/AppError");

const authorize = (...allowedRoles) =>{
  return (req , res , next) =>{
    
    if(!req.user){
      return next(new AppError("User not authenticated", 401));
    }

    if(!allowedRoles.includes(req.user.role)){
      return next(new AppError("User not authorized to access this route", 403));
    }
    next();
  }
}


module.exports = authorize;