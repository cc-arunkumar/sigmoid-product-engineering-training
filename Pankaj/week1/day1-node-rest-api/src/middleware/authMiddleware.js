const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

//  Protect (Authentication)
const protect = (req, res, next) => {
  try {
    let token;

    //  Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //  No token
    if (!token) {
      return next(new AppError("Not authorized, token missing", 401));
    }

    //  Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "mysecretkey"
    );

    //  Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    //  Better error handling
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }

    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401));
    }

    return next(
      new AppError(error.message || "Authentication failed", 401)
    );
  }
};

//  Authorize (Role-based)
const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      //  No user attached
      if (!req.user) {
        return next(new AppError("Not authenticated", 401));
      }

      //  Check role
      if (!roles.includes(req.user.role)) {
        return next(new AppError("Access denied", 403));
      }

      next();
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  };
};

module.exports = {protect,authorize};