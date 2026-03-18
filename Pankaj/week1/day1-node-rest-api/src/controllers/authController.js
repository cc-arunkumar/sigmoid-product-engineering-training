const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");

const AppError = require("../utils/AppError");

const user=[
    {id:1,
    username:"pankaj",
    password:"password123" 
    },
    {
        id:2,
        username:"admin",
        password:"admiin123"
    }     
];

exports.login = (req, res, next) => {   
    try {
        const { username, password } = req.body;    
        if(!username || !password){
            return next(new AppError("Username and password are required", 400));
        }

        const user = user.find(u => u.username === username);

        if(!user || user.password !== password){
            return next(new AppError("Invalid credentials", 401));
        }

        const token = jwt.sign({ 
            id: user.id, username: user.username,
            role: user.role
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