const jwt = require("jsonwebtoken");
//const { successResponse } = require("../utils/apiResponse");
const AppResponse=require("../utils/AppResponse")
const AppError = require("../utils/AppError");
// const USER={
//     id:1, 
//     username:"admin",
//     password:"admin",
//     role:"admin"
//     }
const USER = 
    [{
    id:1, 
    username:"admin",
    password:"admin",
    role:"admin"
    },
    {
        id:2,
        username:"user",
        password:"user",
        role:"user"
    }
    ]
;


exports.googleCallback = (req, res, next) => {
 try {
 const user = req.user;
 if (!user) {
 return next(new AppError("Google authentication failed", 401));
 }
 // Generate JWT
 const token = jwt.sign(
 {
 userId: user.id,
 username: user.username,
 role: user.role
 },
 process.env.JWT_SECRET || "mysecretkey",
 { expiresIn: "1h" }
 );
return new AppResponse({data: { token },message:"Google login successful"}).send(res);
 } catch (error) {
 return next(new AppError(error.message || "OAuth login failed", 500));
 }
};

exports.login = (req,res,next) => {
    try{
        const {username, password} = req.body;

        // if(!username || !password){
        //     return next(new AppError("Username and Password are required",400));
        // }
        const user=USER.find(useritem=>useritem.username===username)
        if(!user || user.password!==password){
            return next(new AppError("Invalid Credentials",401));
        }

        // if(username !== USER.username || password !== USER.password){
        //     return next(new AppError("Invalid Credentials",401));
        // }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role:user.role
            },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn: "1h"
            }
        );
        return new AppResponse({data:{token},message:"login succesful"}).send(res)

    } catch (error){
        return next(new AppError(error.message || "Login Failed",500));
    }
}