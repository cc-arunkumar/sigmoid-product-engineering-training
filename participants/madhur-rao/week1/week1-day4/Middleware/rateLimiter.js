const rateLimit = require("express-rate-limit");
const AppError = require("../utils/appError");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 25,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req,res,next) => {
        return next(new AppError("Too many requests, please try again later"),429);
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    
    handler: (req,res,next) =>{
        return next(new AppError("Too many login attempts, try again later",429));
    }
});

module.exports = {apiLimiter, authLimiter};