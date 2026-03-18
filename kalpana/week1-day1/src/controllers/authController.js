const jwt = require("jsonwebtoken");

const { successResponse } = require("../utils/apiResponse");

const appError = require("../utils/appError");


//hardcoded user (for training purpose)
const USER = {
    id: 1,
    username: "kalpana",
    password: "kalapana123"
};

exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        //validate input
        if (!username || !password) {
            return next(new appError("username and password are required", 400));
        }
        //check credentials
        if (username !== USER.username || password !== USER.password) {
            return next(new appError("Invalid Credentials", 401));
        }


        //generate token
        const token = jwt.sign({
            userId: USER.id,
            userName: USER.username
        },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn: "1h"
            }
        );

        //send response
        return successResponse(res, "Login Sucessfully" , {token});
    }
    catch(error){
        return next(new appError(error.message) || "Login Failed", 500);
    }
};