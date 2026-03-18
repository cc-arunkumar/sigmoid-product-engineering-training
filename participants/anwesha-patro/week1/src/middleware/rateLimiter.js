const rateLimit = require("express-rate-limit");

const AppError = require("../utils/appError");

// general API limiter

const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, next) => {
        return next(new AppError("too many request, please try again later", 429))
    }
})

//strict limiter for auth login
const authLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 4,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        return next(new AppError("Too many trials, please try again later", 429))
    }
})

module.exports = {
    apiLimiter,
    authLimiter
}