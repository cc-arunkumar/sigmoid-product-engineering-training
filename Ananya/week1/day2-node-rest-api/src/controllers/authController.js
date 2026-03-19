const jwt= require("jsonwebtoken")
const AppError = require("../utils/AppError")
const{successResponse}= require("../utils/apiResponse");

const User=[{
    id:1,
    username:"Ananya",
    password:"Ananya@123",
    role:"admin"
},
{
    id:2,
    username:"user1",
    password:"user@123",
    role:"user"
}]
exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        // 1. Validate input
        if (!username || !password) {
            return next(new AppError("Username and password are required", 400));
        }

        // 2. Find user
        const user = User.find(u => u.username === username);

        // 3. Validate credentials (FIXED)
        if (!user || password !== user.password) {
            return next(new AppError("Invalid Credentials", 401));
        }

        // 4. Generate token
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1h" }
        );

        return successResponse(res, "login successful", { token });

    } catch (error) {
        return next(new AppError(error.message || "login failed", 500));
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
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1h" }
        );

        // If a client URL is configured, redirect there with token in query string
        const clientUrl = process.env.CLIENT_URL; // e.g., http://localhost:3000 or your frontend URL
        const redirectPath = clientUrl
            ? `${clientUrl.replace(/\/$/, "")}/auth/success?token=${encodeURIComponent(token)}&username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}`
            : `/api/auth/success?token=${encodeURIComponent(token)}&username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}`;

        return res.redirect(redirectPath);
    } catch (error) {
        return next(new AppError(error.message || "OAuth login failed", 500));
    }
};

// Test endpoint: simulate OAuth success locally
exports.testSuccess = (req, res, next) => {
    try {
        const user = {
            id: 'local-test',
            username: 'local_test_user',
            email: 'local@test.example',
            role: 'user'
        };

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1h" }
        );

        const clientUrl = process.env.CLIENT_URL; // optional frontend URL
        const redirectPath = clientUrl
            ? `${clientUrl.replace(/\/$/, "")}/auth/success?token=${encodeURIComponent(token)}&username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}`
            : `/api/auth/success?token=${encodeURIComponent(token)}&username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}`;

        return res.redirect(redirectPath);
    } catch (err) {
        return next(new AppError(err.message || 'test success failed', 500));
    }
};