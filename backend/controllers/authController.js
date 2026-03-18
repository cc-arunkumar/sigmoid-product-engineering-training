const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// Hardcoded user (for taining purpose)
const USER ={
    id: 1,
    username: "admin",
    password: "1234"
};

exports.login = (req, res, next) =>{
    try{
        const {username, password} = req.body;

        //1. validate input
        if(!username || !password){
            return next(new AppError("Username and password are required",400));
        }
        //2. check credentials
        if(username !== USER.username || password !== USER.password){
            return next(new AppError("Invalid credentials",401));
         }
         //3. Generate token
         const token = jwt.sign(
            {
                userId: USER.id,
                username: USER.username
            },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn: "1h"
            }
         );
         // send response
         return successResponse(res, "Login successful",{token});

        }
        catch(error) {
            return next(new AppError(error.message || "Login failed",500));
        }
};