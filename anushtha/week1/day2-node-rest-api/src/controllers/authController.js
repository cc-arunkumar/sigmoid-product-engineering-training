// controllers/authController.js 

  

const jwt = require("jsonwebtoken"); 

const { successResponse } = require("../utils/apiResponse"); 

const AppError = require("../utils/AppError"); 

  

// Mock users 

const USERS = [ 

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

]; 

  

exports.login = (req, res, next) => { 

    try { 

        const { username, password } = req.body; 

  

        // Validation 

        if (!username || !password) { 

            return next(new AppError("Username and password required", 400)); 

        } 

  

        // Find user 

        const user = USERS.find(u => u.username === username); 

  

        if (!user || user.password !== password) { 

            return next(new AppError("Invalid credentials", 401)); 

        } 

  

        // Generate token 

        const token = jwt.sign( 

            { 

                id: user.id, 

                role: user.role 

            }, 

            process.env.JWT_SECRET, 

            { expiresIn: "1h" } 

        ); 

  

        return successResponse(res, "Login successful", { token }); 

  

    } catch (error) { 

        return next(new AppError("Login failed", 500)); 

    } 

}; 