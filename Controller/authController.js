const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiresponce");
const AppError = require("../utils/AppError");

const USER = [
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
        // cheak validate 
        if (!username || !password) {
            return next(new AppError("username and password are required", 400));
        }

        // cheak credantials 

        // Find user

        const user = USERS.find(u => u.username === username);
        // if (username != USER.username || password != USER.password) {
        //     return next(new AppError("Invalid credentials", 401));
        // }

        if (!user || user.password !== password) {

            return next(new AppError("Invalid credentials", 401));

        }

        // genrate tokens
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username , 
                role : user.role 
            },
            process.env.JWT_SECRET || "ha_ye_mera_secret_hai",
            {
                expiresIn: "1h"
            }
        )

        return successResponse(res, "Login SuccessFull", { token });
    }
    catch {
        return next(new AppError(error.message || "Login failed", 500));
    }
};