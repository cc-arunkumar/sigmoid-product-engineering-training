const ratelimit=require("express-rate-limit");
const AppError=require("../utils/appError");

const apiLimiter=ratelimit({
    windowMs:15*60*1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,

    handler:(req, res, next)=>{
        return next(new AppError(" too many requests, try again later" , 429));
    }
});

const authLimiter=ratelimit({
    windowMs:15*60*1000,
    max:3,
   standardHeaders: true,
legacyHeaders: false,

    handler:(req, res, next)=>{
        return next(new AppError(" too many login attempts, try again later" , 429));
    }
});

module.exports={
    apiLimiter,
    authLimiter
};

