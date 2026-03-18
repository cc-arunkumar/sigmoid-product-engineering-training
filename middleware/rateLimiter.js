const rateLimit = require("express-rate-limit");
const AppError = require("../utils/AppError"); 

// general Api Limiter
const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many accounts created from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req, res, next) {
    // Customize the error response
    return next(
      new AppError(
        "Too many requests from this IP, please try again later.",
        429
      )
    );
  },
});

// strict limiter for auth (login protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message:
    "Too many login attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req, res, next) {
    // Customize the error response
    return next(
      new AppError(
        "Too many login attempts, please try again later.",
        429
      )
    );
  },
});

module.exports = {
  appLimiter,
  authLimiter,
}; 