const { successResponse } =require("../utils/apiresponses");
const AppError = require("../utils/appError");

const jwt= require("jsonwebtoken");

const USER={
    id:1,
    username:"admin",
    password:"1234"
};

exports.login=(req, res, next)=>{
    try{

      const { username, password}=req.body;

      if(!username || !password ){
        return  next(new AppError("please enter credentials" , 400));
      }

        if(username!==USER.username || password!==USER.password ){
        return  next(new AppError("please enter valid credentials" , 400));
      }

      const token=jwt.sign({
         userid:USER.id,
         username:USER.username
      },
      process.env.JWT_SECRET||"MYSECRETKEY",
      {
        expiresIn:"1h"
      }
    
    )
    return successResponse(res, "tokent creeated", token, 200)


    }catch(error){
        return next(new AppError("Login failed", 400))
    }
}