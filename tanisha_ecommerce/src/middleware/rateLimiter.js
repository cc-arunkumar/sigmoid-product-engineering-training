const ratelimit = require("express-rate-limit");
const AppError = require("../utils/AppError");

const apiLimiter = ratelimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes !!",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        next(new AppError("Too many requests from this IP, please try again after 15 minutes !!", 429));
    }
})

//strict limiter for login route
const authLimiter = ratelimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 5 login requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes !!",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        next(new AppError("Too many login attempts from this IP, please try again after 15 minutes !!", 429));
    }
})

module.exports = {
    apiLimiter,
    authLimiter
};