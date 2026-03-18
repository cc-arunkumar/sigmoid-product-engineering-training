const jwt = require('jsonwebtoken');

const { successResponse } = require('../utils/apiResponse');
const AppError = require('../utils/appError');

const USERS = [ {
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
} ];

exports.login = (req, res, next) => {
    console.log("HI");
    
    try{
        const { username, password } = req.body;

            if(!username || !password) {
                return next(new AppError("Username and password are required", 400));
            }
            
            if(username !== USER.username || password !== USER.password) {
                return next(new AppError("Invalid username or password", 401));
            }

            const token = jwt.sign({ 
                userId: USER.id, 
                username: USER.username,
                role: USER.role
            }, process.env.JWT_SECRET || "mysecretkey", 
            { expiresIn: '1h' }
        );
            res.json(successResponse(res,"Login successful", { token }));
    } catch (error) {
        return next(new AppError(error.message || "Login failed", 500));
    }
}