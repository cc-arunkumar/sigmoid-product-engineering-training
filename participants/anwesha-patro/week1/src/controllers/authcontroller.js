const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");

const USER = {
    id: 1,
    username: "admin",
    password: "admin123"
};

exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return next(new AppError("Fields are mandatory", 400));
        }

        if (username !== USER.username || password !== USER.password) {
            return next(new AppError("Invalid credentials", 401));
        }

        const token = jwt.sign(
            {
                userId: USER.id,
                username: USER.username
            },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1h" }
        );

        return successResponse(res, "Login Successful", { token });

    } catch (error) {
        return next(new AppError(error.message || "Login Failed", 500));
    }
};