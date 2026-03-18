const jwt=require("jsonwebtoken");
const {successResponse}=require("../utils/apiResponse");
const AppError = require("../utils/appError");
const USER={
    id:1,
    username:"admin",
    password:"1234"
};
exports.login=(req,res,next)=>{
    try{
        const {username,password}=req.body;
        if(!username||!password){
            return next(new AppError("Username and password are required",400));
        }
        if(username!==USER.username||password!==USER.password){
            return next(new AppError("Invalid credentials",401));
        }
        const token=jwt.sign(
            {
                userId:USER.id,
                username:USER.username
            },
            process.env.JWT_SECRET||"mysecretkey",
            {
                expiresIn:"1h"
            }
        );
        return successResponse(res,"Login successful",{token});
    }catch(error){
        return next (new AppError(error.message||"Login failed",400));
    }
}