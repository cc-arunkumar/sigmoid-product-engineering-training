const rateLimiter = require("express-rate-limit");
const AppError = require("../utils/AppError");

// Rate limiter middleware
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders:false, // Disable the `X-RateLimit-*` headers

    handler: (req, res, next) => {
        return next(new AppError("Too many requests, Please try again later", 429));
    }
});


//strict rate limiter for auth(login protection)
const authLimiter = rateLimiter({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 3, // limit upto 3 login attempts per window
    standardHeaders: true,
    legacyHeaders:false,

    handler: (req, res, next) => {
        return next(new AppError("Too many login attempts, Please try again later", 429));
    }
});

module.exports = {
    apiLimiter,
    authLimiter
}