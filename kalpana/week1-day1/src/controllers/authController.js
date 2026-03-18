const jwt = require("jsonwebtoken");

const { successResponse } = require("../utils/apiResponse");

const appError = require("../utils/appError");

const USER = {
    id: 1,
    username: "kalpana",
    password: "kalapana123"
};

exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return next(new appError("username and password are required", 400));
        }
        if (username !== USER.username || password !== USER.password) {
            return next(new appError("Invalid Credentials", 401));
        }

        const token = jwt.sign({
            userId: USER.id,
            userName: USER.username
        },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn: "1h"
            }
        );

        return successResponse(res, "Login Sucessfully" , {token});
    }
    catch(error){
        return next(new appError(error.message) || "Login Failed", 500);
    }
};