const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// ✅ Rename to users (plural)
const users = [
    {
        id: 1,
        username: "pankaj",
        password: "password123",
        role: "user"
    },
    {
        id: 2,
        username: "admin",
        password: "admin123",
        role: "admin"
    }
];

exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return next(new AppError("Username and password are required", 400));
        }

        // ✅ Find user correctly
        const foundUser = users.find(u => u.username === username);

        if (!foundUser || foundUser.password !== password) {
            return next(new AppError("Invalid credentials", 401));
        }

        // ✅ Generate JWT
        const token = jwt.sign(
            {
                id: foundUser.id,
                username: foundUser.username,
                role: foundUser.role
            },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1h" }
        );

        return successResponse(res, "Login successful", { token });

    } catch (error) {
        return next(new AppError(error.message || "Login failed", 500));
    }
};


// Google OAuth success handler
exports.googleCallback = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new AppError("Google authentication failed", 401));
        }
        // Generate JWT
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1h" }
        );

        return successResponse(res, "Google login successful", { token });
 } catch (error) {
        return next(new AppError(error.message || "OAuth login failed", 500));
 }
};
