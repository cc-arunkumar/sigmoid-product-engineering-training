const jwt = require("jsonwebtoken");
const {successResponse} = require("../utils/apiresponce");
const AppError = require("../utils/AppError")  ; 

const USER = {
    id : 1 , 
    username: "admin" , 
    password : 123 
}; 

exports.login = (req , res , next)=>{
    try{
        const {username , password} = req.body ; 
        // cheak validate 
        if(!username || !password){
            return next(new AppError("username and password are required" , 400));
        }

        // cheak credantials 
        if(username != USER.username || password != USER.password){
            return next(new AppError("Invalid credentials" , 401));
        }

        // genrate tokens
        const token = jwt.sign(
            {
                userId  : USER.id , 
                username : USER.username 
            } , 
            process.env.JWT_SECRET || "ha_ye_mera_secret_hai" , 
            {
                expiresIn:"1h"
            }
        )

        return  successResponse(res , "Login SuccessFull" , {token});
    }
    catch{
        return next(new AppError(error.message || "Login failed" , 500));
    }
};
