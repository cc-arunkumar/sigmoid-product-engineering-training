const rateLimit = require("express-rate-limit");
const AppError=require("../utils/AppError");
const apiLimiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,
    handler:(req,res,next)=>{
        return next(new AppError("Too many requests,please try again later"));
    }
});
const authLimiter=rateLimit({
    windowMs:15*60*1000,
    max:3,
    standardHeaders:true,
    legacyHeaders:false,
    handler:(req,res,next)=>{
        return next(new AppError("Too many login attempts,try again later",429));
    }
});
module.exports={
    apiLimiter,
    authLimiter
};