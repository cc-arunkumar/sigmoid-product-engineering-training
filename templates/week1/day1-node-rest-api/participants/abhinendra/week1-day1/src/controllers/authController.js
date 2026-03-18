const jwt= require("jsonwebtoken");

const { successResponse }= require("../utils/apiResponse");

const AppError = require("../utils/AppError");

// Hardcoded user (for training purpose)

const USERS =[{
    id:1,
    username: "admin",
    password: "1234",
    role: "admin"
},
{
    id:2,
    username: "user",
    password: "1234",
    role: "user"
}
]
exports.login= (req ,res ,next )=>{

    try{
        const {username, password}= req.body;

        if(!username || !password){
            return next(new AppError("UserName and Password are required", 400));
        }

        const user= USERS.find(u => u.username===username);

        
        if(username !== USER.username || password !== USER.password) {
            return next(new AppError("Invalid Credentials", 401));
        }

        const token = jwt.sign(
            {
                userId : USER.id,
                username : USER.username
            },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn: "1h"
            }
        );

        return successResponse(res, "Login successful", { token });
    }
    catch(error) {
        return next(new AppError(error.message || "Login failed", 500));
    }
};