const rateLimit = require("express-rate-limit");
const AppError = require("../utils/appError");

// General API Limiter

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, next) => {
        return next(new AppError("Too many requests, pleasee try again later", 429));
    }
});

// Strict limiter for auth(login protection)

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, next) => {
        return next(new AppError("Too many login requests, please try again later", 429));
    }
});

module.exports = {
    apiLimiter,
    authLimiter
};
