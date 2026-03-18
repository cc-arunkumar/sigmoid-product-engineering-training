const { successResponse } =require("../utils/apiresponses");
const AppError = require("../utils/appError");

const jwt= require("jsonwebtoken");

const USER=[{
    id:1,
    username:"admin",
    password:"1234",
    role:"admin"
},
{
    id:2,
    username:"user",
    password:"1234",
    role:"user"
}
    
];

exports.login=(req, res, next)=>{
    try{

      const { username, password}=req.body;

       const user=USER.find(u=>u.username===username);

      if(!user || !user.password ===password){
        return  next(new AppError("please enter valid credentials" , 401));
      }


      const token=jwt.sign({
         userid:USER.id,
         username:USER.username,
          role:user.role
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