const rateLimit = require('express-rate-limit');
const AppError = require('../utils/appError');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    
    handler: (req, res, next) => {
        return next(new AppError("Too many requests, please try again later", 429));
    }
});

const authlImiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    
    handler: (req, res, next) => {
        return next(new AppError("Too many login attempts, please try again later", 429));
    }

});

module.exports = {
    apiLimiter,
    authlImiter
};