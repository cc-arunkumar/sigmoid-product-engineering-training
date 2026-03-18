const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");

const AppError = require("../utils/AppError");

const user={
    id:1,
    username:"pankaj",
    password:"password123"      
};

exports.login = (req, res, next) => {   
    try {
        const { username, password } = req.body;    
        if(!username || !password){
            return next(new AppError("Username and password are required", 400));
        }

        if(username !== user.username || password !== user.password){
            return next(new AppError("Invalid credentials", 401));
        }

        const token = jwt.sign({ 
            id: user.id, username: user.username
        },
        process.env.JWT_SECRET || "mysecretkey",
        {
            expiresIn: "1h" }
        );

        return successResponse(res, { token }, "Login successful");

    }
    catch (error) {
        return next(new AppError(error.message || "Login failed", 500));
    }
};  