import rateLimit from "express-rate-limit";
import AppError from "../utils/appError.js";

export const apiLimiter=rateLimit({
   
        windowMs : 15*60*1000,
        max:5,
        standardHeader:true,
        legacyHeaders:false,

        handler:(req,res,next)=>{
            return next(new AppError("Too many api hits , try later",429));
        }
    });

export const authLimiter = rateLimit({
    windowMs:15*60*1000,
    max:3,
    standardHeader:true,
    legacy:false,

    handler:(req,res,next)=>{
        return next(new AppError("Too many incorrect logins try later" , 429));
    }
});


