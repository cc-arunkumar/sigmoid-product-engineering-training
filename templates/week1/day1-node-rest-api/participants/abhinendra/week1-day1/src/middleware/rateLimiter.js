const rateLimiter= require("express-rate-limit");

const AppError= require("../utils/AppError");

const apiLimiter = rateLimiter({
    windowMs: 15*60*1000,
    max :100,
    standardHeaders: true,
    legacyHeaders : false,

    handler: ( req, res , next)=>{
        return next(new AppError("Too many requests, (apilimit reached)please ry again ", 429));
    }
});

const authLimiter= rateLimiter({
    windowMs: 15*60*1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders : false,

    handler: ( req, res , next)=>{
        return next(new AppError("Too many requests, (authlimit reached)please try again ", 429));
    }
});

module.exports={

    apiLimiter,
    authLimiter

}