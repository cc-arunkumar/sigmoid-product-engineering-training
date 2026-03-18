import jwt from "jsonwebtoken";
import { successResponse } from "../utils/apiResponse.js";
import AppError from "../utils/appError.js";

// Hardcoded user credentials

const user = {
    id:1,
    username:"admin",
    password:"admin@123"
};

export const login = (req,res,next) => {
    try{
        const {username,password} = req.body;
        // 1. input fields cannot be empty
        if(!username || !password){
            return next(new AppError("You forgot to put username or password",400));
        }

        //2. Validate credentials
        if(username!=user.username || password!=user.password){
            return next(new AppError("Wrong credentials",401));
        }

        // 3. generate token

        const token = jwt.sign(
            {
                userId:user.id,
                username:user.username
            },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn:"1h"
            }
        );
        //4.Send Response
        return successResponse(res,"Login Successful",{token});

    }
    catch(error){
        return next(new AppError(error.message || "Login failed" , 500));
    }
};