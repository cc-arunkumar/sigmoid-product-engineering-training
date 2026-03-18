const jwt = require("jsonwebtoken")
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError")

const USER = [
    {
        id: 1,
        username: "admin",
        password: "1234",
        role: "admin"
    },
    {
        id: 2,
        username: "user",
        password: "1234",
        role: "user"
    }
]

exports.login = (req, res, next) => {
    try{
        const { username , password } = req.body;
        
        if(!username || !password){
            return next(new AppError("UserName and Password are requires", 400));
        }

        const user = USER.find(u => u.username === username);

        if(!user || user.password !== password){
            return next(new AppError("Invalid Credentials", 401));
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || "mysecretkey",
            {   
                expiresIn: "1h"
            }
        );

        return successResponse(res, "Login Succesfull", {token});
    } 
    catch(error){
        return next(new AppError(error.message || "Login Failed", 500));
    }
}