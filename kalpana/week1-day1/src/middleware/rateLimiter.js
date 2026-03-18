const rateLimit = require("express-rate-limit");
const AppError = require("../utils/appError");
// General API limiter

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        return next(new AppError("Too many requests, please try again later", 429));
    }
});

// Strict limiter for auth (login protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3, // only 3 login attempts
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        return next(new AppError("Too many login attempts, try again later", 429));
    }
});
module.exports = {
    apiLimiter,
    authLimiter
};