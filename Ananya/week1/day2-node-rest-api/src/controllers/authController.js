const jwt= require("jsonwebtoken");
const {successResponse}= require("../utils/apiResponse");
const AppError= require("../utils/AppError");

// creating user for practice purpose
const User={
    id:1,
    username:"Ananya",
    password: "Ananaya@123"

};

exports.login= (req,res,next)=>{
    try{
        const {username, password}= req.body;
        // validate input
        if(!username|| !password){
            return next(new AppError("Username and password are required", 400))
        }
        if(username!==User.username || password!== User.password){
           
            return next(new AppError("Invalid Credentials", 401));
        }
        const token= jwt.sign({
            userId: User.id,
            username: User.username

        },
        process.env.JWT_SECRET|| "mysecretkey",
        {
        expiresIn:"1h"
        });
    return successResponse(res, "login successfull",{token});

    }
    
    catch(error){
      return next(new AppError(error.message || "login failed" ,500));
    }
}
