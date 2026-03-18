import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const protect =(req,res,next) =>{
    try{
        let token;

        //1.extra token from authorization header
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        //2. If no token
        if(!token){
            return next(new AppError("Access denied no token provided" , 401));
        }

        //3.verify token
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET || "mysecretkey"
        );
        //4.Attach user info to request

        req.user = decoded;
        next();
    }
    catch(error){
        if(error.name == "JsonWebTokenError"){
            return next(new AppError("Invalid Token" , 401));
        }
        if(error.name == "TokenExpiredError"){
            return next(new AppError("Token expired" , 401));
        }
        return next(new AppError("Authentication failed" , 401));
    }
}