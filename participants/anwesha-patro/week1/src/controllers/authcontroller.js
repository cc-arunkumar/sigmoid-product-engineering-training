const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");

const USER = [{
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin"
},
{
    id: 1,
    username: "user",
    password: "user123",
    role: "user"
}
];

exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return next(new AppError("Fields are mandatory", 400));
        }

        const users = USER.find(u => u.username === username);

        if (!users || users.password !== password) {
            return next(new AppError("Invalid credentials", 401));
        }

        const token = jwt.sign(
            {
                userId: users.id,
                username: users.username,
                role: users.role
            },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1000ms" }
        );

        return successResponse(res, "Login Successful", { token });

    } catch (error) {
        return next(new AppError(error.message || "Login Failed", 500));
    }
};