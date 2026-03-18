const jwt = require("jsonwebtoken");
const { successResponse }= require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// Hardcoded user for demonstration
const user = {
    id: 1,
    username: "admin",
    password: "1234"
};
exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return next(new AppError("Username and password are required", 400));
        }

        // check credentials
        if(username !== user.username || password !== user.password){
            return next(new AppError("Invalid username or password", 401));

        }
        const token = jwt.sign(
            {
                userId : user.id,
                username : user.username
            },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn : "1h"
            }
        );

        return successResponse(res , "Login successful", {token});
    }  catch(error){
        return next(new AppError(error.message || "Login failed" , 500))
    }
};