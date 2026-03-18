const AppError = require("../utils/AppError");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Unauthorized access", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("Forbidden: insufficient", 403));
    }

    next();
  };
};

module.exports = authorize;
