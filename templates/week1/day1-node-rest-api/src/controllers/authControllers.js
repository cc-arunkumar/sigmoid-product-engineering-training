import jwt from "jsonwebtoken";
import { successResponse } from "../utils/apiResponse.js";
import AppError from "../utils/appError.js";

// Hardcoded user credentials

const users = [
    {
    id:1,
    username:"admin1",
    password:"admin@123",
    role:"admin"
},
{
    id:2,
    username:"user1",
    password:"user@123",
    role:"user"
}

];

export const login = (req,res,next) => {
    try{
        const {username,password} = req.body;
        // 1. input fields cannot be empty
        if(!username || !password){
            return next(new AppError("You forgot to put username or password",400));
        }
        const user = users.find(u => u.username === username);

        //2. Validate credentials
        if(username!=user.username || password!=user.password){
            return next(new AppError("Wrong credentials",401));
        }
        
        // 3. generate token

        const token = jwt.sign(
            {
                userId:user.id,
                username:user.username,
                role:user.role
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