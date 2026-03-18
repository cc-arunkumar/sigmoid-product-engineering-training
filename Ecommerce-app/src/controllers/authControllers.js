const jwr = require("jsonwebtoken");
const {successResponse} = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

//Hard coded user details for testing purpose
const USERS = [
    {
        id : 1,
        username : "admin1",
        password : "admin123",
        role : "admin"
    },
    {
        id : 2,
        username : "user1",
        password : "user123",
        role : "user"
    }
];

exports.login = (req,res,next) => {
    try {
        const {username,password} = req.body;

        //1. validatet the input
        if(!username || !password){
            return next(new AppError("Username and password are required !!",400));
        }
        const USER = USERS.find(u => u.username === username);

        //2. validate the user credentials
        if(!USER || USER.password !== password){
            return next(new AppError("Invalid username or password !!",401));
        }
        
        // if(username !== USER.username || password !== USER.password){
        //     return next(new AppError("Invalid username or password !!",401));
        // }

        //3. generate a JWT token
        const token = jwr.sign(
            {
                userId : USER.id, 
                username : USER.username,
                role : USER.role
            }, 
            process.env.JWT_SECRET || "secretkey",
            {
                expiresIn : "1h"
            }
        );

        return successResponse(res,"Login successful !!",{token},200);
    } catch (error) {
        return next(new AppError("Error occurred while generating token !!",500));
    }
};