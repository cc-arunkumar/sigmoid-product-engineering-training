const jwt = require("jsonwebtoken");
//const { successResponse } = require("../utils/apiResponse");
const AppResponse=require("../utils/AppResponse")
const AppError = require("../utils/AppError");

const USER = {
    id:1, 
    username:"admin",
    password:"admin"
};

exports.login = (req,res,next) => {
    try{
        const {username, password} = req.body;

        if(!username || !password){
            return next(new AppError("Username and Password are required",400));
        }

        if(username !== USER.username || password !== USER.password){
            return next(new AppError("Invalid Credentials",401));
        }

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
        return new AppResponse({data:{token},message:"login succesful"}).send(res)

    } catch (error){
        return next(new AppError(error.message || "Login Failed",500));
    }
}