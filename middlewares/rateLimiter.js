const rateLimit = require("express-rate-limit")
const AppError = require("../utils/appError")

const apiLimiter = rateLimit({
    //15 mins window
    windowMs: 15 * 60 * 1000,
    //limit each IP to 100 requests per windowMs
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, next) => {
        return next(new AppError("Too Many requests, please try again later", 429));
    }
});

const authLimiter = rateLimit({
    //15 mins window
    windowMs: 15 * 60 * 1000,
    max: 3,  //only 3 login attempts
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, next) => {
        return next(new AppError("Too Many Login Attempts, try again later", 429));
    }
})

module.exports = {
    apiLimiter,
    authLimiter
}