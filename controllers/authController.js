const jwt = require("jsonwebtoken")
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError")

const USER = {
    id: 1,
    username: "admin",
    password: "1234"
}

exports.login = (req, res, next) => {
    try {
        const { username , password } = req.body;
        
        if(!username || !password){
            return next(new AppError("UserName and Password are requires", 400));
        }

        if(USER.username !== username || USER.password !== password){
            return next(new AppError("Invalid Credentials", 400))
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

        return successResponse(res, "Login Succesfull", {token});
    } 
    catch (error) {
        return next(new AppError(error.message || "Login Failed", 500));
    }
}